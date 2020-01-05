import React from "react";
import { State, Personality } from "../../../shared/types";

type Props = {
  value: Personality;
  onChange: (p: Personality) => void;
};

const PersonalityInput: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <form className="box__content">
      <label className={value === "happy" ? "active" : null}>
        <input
          type="radio"
          name="personality"
          value="happy"
          checked={value === "happy"}
          onChange={handleChange}
        />
        happy
      </label>
      <label className={value === "depressed" ? "active" : null}>
        <input
          type="radio"
          name="personality"
          value="depressed"
          checked={value === "depressed"}
          onChange={handleChange}
        />
        depressed
      </label>
    </form>
  );
};

export default PersonalityInput;
