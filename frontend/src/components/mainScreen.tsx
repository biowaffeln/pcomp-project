import React from "react";
import PersonalityInput from "./personalityInput";
import { State, Personality } from "../../../shared/types";

type Props = {
  state: State;
  setPersonality: (p: Personality) => void;
};

const MainScreen: React.FC<Props> = ({ state, setPersonality }) => (
  <div>
    <div className="container">
      <h1 className="center">Welcome back!</h1>
    </div>
    <div className="container textbox center">
      <h2>here be some text</h2>
    </div>
    <div className="footer container">
      <div className="box">
        <h2>stats</h2>
        <hr />
        <div className="box__content">
          <p>
            <Emoji>💘</Emoji> Health.......
            <Percentage value={state.health} /> {state.health}%
          </p>
          <p>
            <Emoji>🍕</Emoji> Hunger.......
            <Percentage value={state.hunger} /> {state.hunger}%
          </p>
          <p>
            <Emoji>😊</Emoji> Happiness....
            <Percentage value={state.happiness} /> {state.happiness}%
          </p>
        </div>
      </div>
      <div className="box personality-box">
        <h2>personality</h2>
        <hr />
        <PersonalityInput value={state.personality} onChange={setPersonality} />
      </div>
    </div>
    <div className="container">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  </div>
);

const Emoji = ({ children }) => (
  <span style={{ display: "inline-block", width: " 15px" }}>{children}</span>
);

const Percentage = ({ value, width = 12 }) => {
  const numFullBlocks = Math.round((value / 100) * width);
  const numLightBlocks = width - numFullBlocks;
  return (
    <span>
      {"█".repeat(numFullBlocks)}
      {"░".repeat(numLightBlocks)}
    </span>
  );
};

export default MainScreen;
