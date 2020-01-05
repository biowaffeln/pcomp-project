import io from "socket.io-client";
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import NameInput from "./components/nameInput";
import RequestConnect from "./components/requestConnect";
import MainScreen from "./components/mainScreen";

const App: React.FC = () => {
  const socketRef = React.useRef(null);
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    const socket = io("localhost:3000");
    socket.on("data", data => {
      setState(data);
    });
    socketRef.current = socket;
  }, []);

  /* event handlers */
  const setName = (name: string) => {
    socketRef.current.emit("set_name", name);
  };

  const setPersonality = (personality: "happy" | "depressed") => {
    socketRef.current.emit("set_personality", personality);
  };

  const connect = () => socketRef.current.emit("request_connect");

  if (state === null) {
    return <p>"connecting..."</p>;
  }

  if (!state.connected) {
    return <RequestConnect connect={connect} />;
  }

  if (!state.name) {
    return <NameInput setName={setName} />;
  }

  if (state.connected) {
    return <MainScreen state={state} setPersonality={setPersonality} />;
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
