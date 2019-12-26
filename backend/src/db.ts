import * as fs from "fs";
import { BehaviorSubject } from "rxjs";
import produce from "immer";

const writeDB = (data: State) => {
  fs.writeFileSync("db.json", JSON.stringify(data));
};

const readDB = (): State => {
  const initialStae: State = {
    name: "",
    hunger: 0,
    happiness: 0,
    health: 100,
    connected: false,
  };

  try {
    return JSON.parse(fs.readFileSync("db.json").toString());
  } catch (e) {
    return initialStae;
  }
};

export interface State {
  name: string;
  hunger: number;
  happiness: number;
  health: number;
  connected: boolean;
}

export const store = new BehaviorSubject<State>(readDB());

store.subscribe(writeDB);
store.subscribe(console.info);

export const setState = (fn: (state: State) => undefined) => {
  store.next(produce(store.getValue(), fn));
};
