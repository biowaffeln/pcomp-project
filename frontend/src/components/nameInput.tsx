import React, { useState } from "react";

type Props = {
  setName: (name: string) => void;
};

const NameInput: React.FC<Props> = ({ setName }) => {
  const [input, setInput] = useState("");

  return (
    <div className="name-input">
      <h1>Welcome!</h1>
      <p>
        according to our records, your robot does not have <br />a name yet.
        Please input a name:
      </p>
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

export default NameInput;
