import React from "react";

type Props = {
  state: any;
};

const MainScreen: React.FC<Props> = ({ state }) => (
  <div>
    <pre>{JSON.stringify(state)}</pre>
    <h1>Welcome back!</h1>
    <div className="footer">
      <div className="box">
        <h2>stats</h2>
        <hr />
        <div className="box__content">
          <p>
            <Emoji>💘</Emoji> Health.......
            <Percentage number={state.health} /> {state.health}%
          </p>
          <p>
            <Emoji>🍕</Emoji> Hunger.......
            <Percentage number={state.hunger} /> {state.hunger}%
          </p>
          <p>
            <Emoji>😊</Emoji> Happiness....
            <Percentage number={state.happiness} /> {state.happiness}%
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

const Percentage = ({ number }) => {
  const nBlocks = Math.round(number / 8.33333);
  const nBlanks = 12 - nBlocks;
  return (
    <span>
      {"█".repeat(nBlocks)}
      {"░".repeat(nBlanks)}
    </span>
  );
};

export default MainScreen;
