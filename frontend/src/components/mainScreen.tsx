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
          <p>Health 💘: {state.health}</p>
          <p>Hunger 🍘: {state.hunger}</p>
          <p>Happiness 😊: {state.happiness}</p>
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

export default MainScreen;
