import { Arduino } from "./serial";
import { Subject, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { store, setState } from "./db";

export const initGame = (arduino: Arduino) => {
  const disconnect$ = new Subject<boolean>();

  // create a timer
  const timer = interval(1000);

  timer
    // unsubscribe on disconnect
    .pipe(takeUntil(disconnect$))
    .subscribe(time => {
      // time related game logic
      if (time % 6 == 0 && store.value.hunger < 100) {
        setState(state => {
          state.hunger += 1;
        });
      }
    });

  arduino.onDisconnect(() => {
    disconnect$.next(true);
  });
};
