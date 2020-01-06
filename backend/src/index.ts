import * as express from "express";
import * as socketio from "socket.io";
import { createServer } from "http";
import { connectToArduino } from "./serial";
import { store, setState } from "./db";
import { initGame } from "./game";
import {
  REQUEST_CONNECT,
  SET_NAME,
  SET_PERSONALITY,
  SOCKET_DATA,
} from "../../shared/socket-events";

/* TODO: remove express, don't rly need it */
const app = express();
const http = createServer(app);
const io = socketio(http);

io.on("connection", socket => {
  socket.on(REQUEST_CONNECT, () => {
    init();
  });

  socket.on(SET_NAME, name => {
    setState(state => {
      state.name = name;
    });
  });

  socket.on(SET_PERSONALITY, personality => {
    setState(state => {
      state.personality = personality;
    });
  });

  store.subscribe(data => {
    socket.emit(SOCKET_DATA, data);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.info(`server running on port ${port}`);
});

const init = async () => {
  try {
    const arduino = await connect();
    initGame(arduino);
  } catch (e) {
    console.warn(e);
  }
};

const connect = async () => {
  const arduino = await connectToArduino();

  setState(state => {
    state.connected = true;
  });

  arduino.onDisconnect(() => {
    setState(state => {
      state.connected = false;
    });
  });

  return arduino;
};

init();
