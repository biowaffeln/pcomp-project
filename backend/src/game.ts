import { Arduino } from "./serial";
import { Subject, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { store, setState } from "./db";

const THRESHOLD = 10;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const initGame = (arduino: Arduino) => {
  const disconnect$ = new Subject<boolean>();

  // create a timer
  const timer = interval(1000);

  let squint = false;
  arduino.onData(data => {
    const cmd = data.split(" ");

    // for calibration
    // console.log(data);

    if (cmd[0] === "touch") {
      const capVal = +cmd[1];
      if (capVal < THRESHOLD) {
        squint && arduino.send("led unsquint;");
        squint = false;
      } else {
        !squint && arduino.send("led squint;");
        squint = true;
      }
    }
  });

  timer
    // unsubscribe on disconnect
    .pipe(takeUntil(disconnect$))
    .subscribe(time => {
      if (time % 3 == 0) {
        !squint && arduino.send("led blink;");
        // arduino.send("srv 180;");
      }

      // arduino.send("hello");
      // time related game logic
      // if (time % 6 == 0 && store.value.hunger < 100) {
      //   setState(state => {
      //     state.hunger += 1;
      //   });
      // }
    });

  arduino.onDisconnect(() => {
    disconnect$.next(true);
  });
};
