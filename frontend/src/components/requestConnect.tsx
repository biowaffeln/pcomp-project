import React from "react";

type Props = {
  connect: () => void;
};

const RequestConnect: React.FC<Props> = ({ connect }) => (
  <div>
    <h2>no device connected!</h2>
    <button onClick={connect}>connect</button>
  </div>
);

export default RequestConnect;
