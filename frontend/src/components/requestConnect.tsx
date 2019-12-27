import React from "react";

type Props = {
  connect: () => void;
};

const RequestConnect: React.FC<Props> = ({ connect }) => (
  <div className="connection">
    <h1>no device connected :/</h1>
    <button onClick={connect}>request connection</button>
  </div>
);

export default RequestConnect;
