import { Arduino } from "./serial";
import { Subject, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { store, setState } from "./db";

export const initGame = (arduino: Arduino) => {
  const clock = interval(1000);
  const disconnect$ = new Subject<boolean>();

  clock.pipe(takeUntil(disconnect$)).subscribe(time => {
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
