import React from "react";

type Props = {
  messages: string[];
};

const MessageDisplay: React.FC<Props> = ({ messages }) => (
  <div className="container textbox center">
    {messages.map(text => {
      <p>{text}</p>;
    })}
  </div>
);

export default MessageDisplay;
