import React, { useState } from "react";

type Props = {
  setName: (name: string) => void;
};

const SetName: React.FC<Props> = ({ setName }) => {
  const [input, setInput] = useState("");

  return (
    <div>
      <h2>Welcome!</h2>
      <p>according to our records, your robot does not have a name yet.</p>
      <p>Please input a name:</p>
      <form
        onSubmit={e => void e.preventDefault() || (input && setName(input))}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        ></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SetName;
