const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const index = require("./index")
const router = express.Router();
const axios = require('axios');
// our localhost port
const port = 4001;

const app = express();
app.use(index);
// our server instance
const server = http.createServer(app)

class Room {
  constructor(format, roomID){
    this.roomID = roomID;
    this.people = [];
    this.format = format; 
  }
}

class Drafter { 
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.deck = [];
    this.pack = null;
  }
}

function runDraft(room){
  for (i = 0; i < 3; i++){
    runRound(room);
  }
}

function runRound(room){
  // Give everyone a pack

   // while peoples packs are not empty,
   // user picks a card and puts it in
   // passes to next
}


// Mock Database 
// A room should have { roomID, format, packs}
const rooms = {};

// This creates our socket using the instance of the server
const io = socketIO(server)
var lobbySocket = io.of('/lobby');

// This is what the socket.io syntax is like
lobbySocket.on('connection', socket => { 
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('create room', (format) => {
    const length = Object.keys(rooms).length
  	console.log('creating room: ' + length + ' format: ' + format);
    const room = new Room(format, length)
  	rooms[length] = room;
  })

  socket.on('roomlist', () => {
    socket.emit('roomlist', rooms);
  })

  socket.on('joinroom', (roomID, username) => {
    console.log(username + ' is joining ' + roomID);

    const drafter = new Drafter(1, username);
    rooms[roomID].people.push(drafter);

    const length = Object.keys(rooms[roomID].people).length;
    console.log('number of players in room: ' + length);
    socket.join(roomID);
  })

})



server.listen(port, () => console.log(`Listening on port ${port}`))