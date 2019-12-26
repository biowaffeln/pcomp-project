import * as SerialPort from "serialport";
import * as Readline from "@serialport/parser-readline";

const SerialPromise = (): Promise<SerialPort> => {
  return new Promise((resolve, reject) => {
    const port = new SerialPort("COM3", { baudRate: 9600 }, err => {
      if (err) {
        reject(err.message);
      } else {
        resolve(port);
      }
    });
  });
};

interface Arduino {
  send: (data: string) => void;
  onData: (handler: (data: string) => void) => void;
  onDisconnect: (handler: (data?: any) => void) => void;
}

export const connectToArduino = async (): Promise<Arduino> => {
  const port = await SerialPromise();

  const parser = new Readline();
  port.pipe(parser);

  const sendToArduino = (data: string) => {
    port.write(data, error => error && console.warn(error));
  };

  return {
    send: sendToArduino,
    onData: fn => parser.on("data", fn),
    onDisconnect: fn => port.on("close", fn),
  };
};
