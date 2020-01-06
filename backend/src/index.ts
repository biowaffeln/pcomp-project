import * as express from "express";
import * as socketio from "socket.io";
import { createServer } from "http";
import { connectToArduino } from "./serial";
import { store, setState } from "./db";
import { initGame } from "./game";

const app = express();
const http = createServer(app);
const io = socketio(http);

io.on("connection", socket => {
  socket.on("request_connect", () => {
    connect();
  });

  socket.on("set_name", name => {
    setState(state => {
      state.name = name;
    });
  });

  socket.on("set_personality", personality => {
    setState(state => {
      state.personality = personality;
    });
  });

  store.subscribe(data => {
    socket.emit("data", data);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.info(`server running on port ${port}`);
});

/* test arduino */

const connect = async () => {
  try {
    const arduino = await connectToArduino();

    setState(state => {
      state.connected = true;
    });

    initGame(arduino);

    arduino.onDisconnect(() => {
      setState(state => {
        state.connected = false;
      });
    });
  } catch (e) {
    // arduino fails to connect
    console.warn(e);
    setState(state => {
      state.connected = false;
    });
  }
};

connect();
