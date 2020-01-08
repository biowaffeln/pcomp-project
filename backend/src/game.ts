import { Arduino } from "./serial";
import { Subject, interval } from "rxjs";
import { takeUntil, map, distinctUntilChanged } from "rxjs/operators";
import { store, setState } from "./db";
import { stat } from "fs";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const initGame = (arduino: Arduino) => {
  const disconnect$ = new Subject<boolean>();

  // create a timer
  const timer = interval(1000);

  /**
   *  state flags
   *
   *  warning: this is a horrible way to manage complex state, at this point one should
   *  probably use a proper state machine like https://github.com/davidkpiano/xstate
   *  but its a uni project and I have deadlines, so ¯\_(ツ)_/¯
   */

  let squinting = false;
  let hungry = store.value.hunger >= 80;

  arduino.onData(data => {
    const cmd = data.split(" ");

    // for calibration
    // console.log(data);
    const handleTouch = (val: number) => {
      const THRESHOLD = 10;

      const capVal = +cmd[1];
      if (capVal < THRESHOLD) {
        squinting && arduino.send("led unsquint;");
        squinting && !hungry && arduino.send("srv 180;");
        squinting = false;
      } else {
        !squinting && arduino.send("led squint;");
        !squinting && !hungry && arduino.send("srv 30;");
        squinting = true;
      }
    };

    const handleFeed = () => {
      setState(state => {
        state.hunger += 10;
        if (state.hunger > 100) state.hunger = 100;
      });
    };

    if (cmd[0] === "touch") {
      handleTouch(+cmd[1]);
    }
  });

  // personality subscription
  store
    .pipe(
      takeUntil(disconnect$),
      map(state => state.personality),
      distinctUntilChanged()
    )
    .subscribe(p => {
      // if (p === "happy") {
      //   arduino.send("led joy;");
      // } else if (p === "depressed") {
      //   arduino.send("led depressed;");
      // }
    });

  // game clock
  timer.pipe(takeUntil(disconnect$)).subscribe(time => {
    // blink
    if (time % 6 === 5) {
      !squinting && arduino.send("led blink;");
    }

    // increase hunger
    if (time % 6 == 0 && store.value.hunger < 100) {
      setState(state => {
        state.hunger += 1;
        if (state.hunger > 100) state.hunger = 100;
      });
    }

    // manage hunger logic
    if (time % 3 == 0) {
      if (store.value.hunger >= 80) {
        hungry = true;
        grumpy();
        setState(state => {
          state.health -= 1;
          if (state.health < 100) state.health = 100;
        });
      } else {
        setState(state => {
          state.health += 2;
          if (state.health > 100) state.health = 100;
        });
        hungry = false;
      }
    }
  });

  const grumpy = async () => {
    arduino.send("srv 0;");
    await sleep(500);
    arduino.send("srv 20;");
    await sleep(500);
    arduino.send("srv 0;");
  };

  arduino.onDisconnect(() => {
    disconnect$.next(true);
  });
};
