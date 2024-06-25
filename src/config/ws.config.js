// In ws.config.js
const WebSocket = require('ws');

let wss = null;

function setupWebSocket(server) {
  wss = new WebSocket.Server({ port: 3005 });;
  console.log("WebSocket server is initialized.");
  wss.on('connection', function connection(ws) {
    console.log('A new client connected');
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
  });
}

function notifyClients(message) {
  if (!wss) {
    console.log('WebSocket server is not initialized.');
    return;
  }

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports =  {setupWebSocket, notifyClients} ;