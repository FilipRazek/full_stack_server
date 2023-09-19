const express = require("express");
const http = require("http");
const server = http.createServer();
const app = express();

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => console.log("Listening on port 3000"));

process.on("SIGINT", () => {
  wss.clients.forEach((socket) => socket.close());
  server.close(() => {
    shutdownDB();
  });
});

/** Websockets */
const { Server: WebSocketServer } = require("ws");

const wss = new WebSocketServer({ server });

function broadcast(server, data) {
  server.clients.forEach((socket) => socket.send(data));
}

wss.on("connection", (socket) => {
  const clientCount = wss.clients.size;
  console.log("Clients connected", clientCount);

  broadcast(wss, "Clients connected: " + clientCount);

  if (socket.readyState === socket.OPEN) {
    socket.send("Welcome to my server!");
  }

  db.run(` INSERT INTO visitors (count, time)
    VALUES (${clientCount}, datetime('now'))`);

  socket.on("close", function close() {
    console.log("A client has disconnected");
  });
});

/** End Websockets */
/** Databases */

const sqlite = require("sqlite3");

const db = new sqlite.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE visitors (
      count INTEGER,
      time TEXT
    )`);
});

function getCounts() {
  db.each("SELECT * FROM visitors", (err, row) => {
    console.log(row);
  });
}

function shutdownDB() {
  getCounts();
  console.log("Shutting down DB");
  db.close();
}
