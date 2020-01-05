import * as fs from "fs";
import { BehaviorSubject } from "rxjs";
import produce from "immer";
import { State } from "../../shared/types";

const writeDB = (data: State) => {
  fs.writeFileSync("db.json", JSON.stringify(data));
};

const readDB = (): State => {
  const initialState: State = {
    name: "",
    hunger: 0,
    happiness: 0,
    health: 100,
    connected: false,
    personality: "happy",
  };

  try {
    return JSON.parse(fs.readFileSync("db.json").toString());
  } catch (_) {
    return initialState;
  }
};

export const store = new BehaviorSubject<State>(readDB());

store.subscribe(writeDB);
store.subscribe(console.info);

export const setState = (fn: (state: State) => void) => {
  store.next(produce(store.getValue(), fn));
};
