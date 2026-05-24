const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

server.on("connection", (socket) => {
  clients.add(socket);

  console.log("1 client connected");

  // When a message arrives from a client
  socket.on("message", (data) => {
    const message = data.toString();

    // Broadcast to all clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);

        // You can also send JSON via stringification:
        // client.send(JSON.stringify({ type: "chat", text: "hi" }));
      }
    }
  });

  // Cleanup on disconnect
  socket.on("close", () => {
    clients.delete(socket);
    console.log("A client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
