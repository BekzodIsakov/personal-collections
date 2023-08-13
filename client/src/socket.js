import { io } from "socket.io-client";

console.log({ url: import.meta.env.VITE_URL });

export const socket = io(import.meta.env.VITE_URL, {
  autoConnect: false,
});
