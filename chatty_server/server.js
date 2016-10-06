// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcast = (data) => {
  wss.clients.forEach((client)=> {
    client.send(data);
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //Server recieves data from client
  ws.on('message', (message) =>{
    var outgoingMessage = {
      type:'incomingMessage',
      id:uuid.v4(),
      username:JSON.parse(message).username,
      content:JSON.parse(message).content
    }
    wss.broadcast(JSON.stringify(outgoingMessage));
  })
  ws.send("Connected to Server");
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});