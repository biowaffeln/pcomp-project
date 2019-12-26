import * as express from "express";
import * as socketio from "socket.io";
import { createServer } from "http";
import { connectToArduino } from "./serial";
import { store, setState } from "./db";

const app = express();
const http = createServer(app);
const io = socketio(http);

io.on("connection", socket => {
  socket.on("request_connect", () => {
    connect();
  });

  socket.on("set_name", name => {
    setState(state => void (state.name = name));
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

    setState(state => void (state.connected = true));
    arduino.onData(msg => {
      console.info(msg);
    });

    arduino.send("hello!");

    arduino.onDisconnect(() => {
      setState(state => void (state.connected = false));
    });
  } catch (e) {
    console.warn(e);
    setState(state => void (state.connected = false));
  }
};

connect();
