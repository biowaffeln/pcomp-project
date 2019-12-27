import React from "react";

type Props = {
  state: any;
};

const MainScreen: React.FC<Props> = ({ state }) => (
  <div>
    <pre>{JSON.stringify(state)}</pre>
    <h1>Welcome back!</h1>
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
      <div className="box">
        <h2>personality</h2>
        <hr />
        <form className="box__content">
          <label>normal</label>
          <input type="checkbox" value="test1" />
          <label>happy</label>
          <input type="checkbox" value="test2" />
          <label>depressed</label>
          <input type="checkbox" value="test3" />
        </form>
      </div>
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
