
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({
  port: 8080,
  verifyClient: (info, done) => {
    if (info.origin === 'https://chat-nest-hazel.vercel.app/') {
      done(true);
    } else {
      done(false);
    }
  },
});
const clients = new Map();

// app.use(express.static('public')); // Serve static files if needed

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        case 'user_joined':
          const userId = Date.now().toString();
          clients.set(ws, { id: userId, username: data.data.username, isOnline: true });
          // Broadcast user joined to all clients
          broadcast({ type: 'user_joined', data: { username: data.data.username } }, ws);
          // Send updated user list to all clients
          broadcastUserList();
          break;
        case 'message':
          // Broadcast message to all clients
          broadcast({ type: 'message', data: data.data });
          break;
        case 'typing_start':
          // Broadcast typing indicator to all other clients
          broadcast({ type: 'typing_start', data: data.data }, ws);
          break;
        case 'typing_stop':
          // Broadcast typing stop to all other clients
          broadcast({ type: 'typing_stop', data: data.data }, ws);
          break;
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    const client = clients.get(ws);
    if (client) {
      console.log(`Client ${client.username} disconnected`);
      // Broadcast user left to all clients
      broadcast({ type: 'user_left', data: { username: client.username } });
      clients.delete(ws);
      broadcastUserList();
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function broadcast(message, sender = null) {
  const messageString = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
}

function broadcastUserList() {
  const users = Array.from(clients.values()).map(client => ({ id: client.id, username: client.username, isOnline: client.isOnline }));
  const message = JSON.stringify({ type: 'user_list', data: users });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});