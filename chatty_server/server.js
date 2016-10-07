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
//Broadcast function
wss.broadcast = (data) => {
  wss.clients.forEach((client)=> {
    client.send(data);
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  var colorArr = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"];
  var randomColorIndex = Math.floor((Math.random() * colorArr.length) + 0);
  var numPeopleObj = {
    type:'numUsers',
    value:wss.clients.length
  }
  var colorObj = {
    type:'color',
    value:colorArr[randomColorIndex]
  }
  //Lets all clients know how many people are connected
  wss.broadcast(JSON.stringify(numPeopleObj));
  //Assigns random color to user
  ws.send(JSON.stringify(colorObj));

  //Server recieves data from client
  ws.on('message', (message) =>{
    console.log(message);
    if(JSON.parse(message).type == 'postMessage'){
      var outgoingMessage = {
        type:'incomingMessage',
        id:uuid.v4(),
        username:JSON.parse(message).username,
        content:JSON.parse(message).content,
        color:JSON.parse(message).color
      }
    } else if(JSON.parse(message).type == 'postNotification'){
      var olduser = JSON.parse(message).olduser;
      var newuser = JSON.parse(message).username;
      var outgoingMessage = {
        type:'incomingNotification',
        id:uuid.v4(),
        content: ` ${olduser} has changed their name to ${newuser}`
      }
    }
    //Sends message to all connected clients
    wss.broadcast(JSON.stringify(outgoingMessage));
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    var numPeopleObj = {
      type:'numUsers',
      value:wss.clients.length
    }
    console.log('Client Disconnected');
    wss.broadcast(JSON.stringify(numPeopleObj));
  });
});