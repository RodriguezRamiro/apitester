//src/socket.js

import { io } from "socket.io-client";
import { BACKEND_URL } from "./config.js";

// Use the BACKEND_URL
const socket = io(BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true,
});

export default socket;
