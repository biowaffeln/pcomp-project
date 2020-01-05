import React from "react";

type Props = {
  value: "happy" | "depressed";
  onChange: (personality: "happy" | "depressed") => void;
};

const PersonalityInput: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <form className="box__content">
      <label>
        <input
          type="radio"
          name="personality"
          value="happy"
          checked={value === "happy"}
          onChange={handleChange}
        />
        happy
      </label>
      <label>
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
