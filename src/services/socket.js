import { io } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"


const socket =io(SOCKET_URL,{
    autoConnect:false,
    transports:["websocket"]
})

export default socket

///autoConnect:false, 
// here we are creating service, and we will make connect and disconnet whenever we want apart of like it will connect when the cpmonenet render.
// transports:["websocket"]
// ther are many ways like polling, websocker, ... which it specifies our socket transports which one 


// Polling: Client repeatedly asks the server, “Do you have any new data?”
// WebSocket: Client and server keep one open connection and can send data to each other anytime.
// WebTransport: A newer, faster communication method over HTTP/3 (QUIC) that supports multiple streams and low-latency data transfer.