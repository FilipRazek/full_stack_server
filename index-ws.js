const express = require("express");
const http = require("http");
const server = http.createServer();
const app = express();

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => console.log("Listening on port 3000"));

/** Websockets */
const { Server: WebSocketServer } = require("ws");

const wss = new WebSocketServer({ server });

function broadcast(server, data) {
  server.clients.forEach(socket => socket.send(data));
}

wss.on("connection", (socket) => {
  const clientCount = wss.clients.size;
  console.log("Clients connected", clientCount);

  broadcast(wss, "Clients connected: " + clientCount);

  if (socket.readyState === socket.OPEN) {
    socket.send("Welcome to my server!");
  }

  socket.on("close", function close() {
    console.log("A client has disconnected");
  });
});
