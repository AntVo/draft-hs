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

// Mock Database 
// A room should have { roomID, format, packs}
const rooms = []; 

// This creates our socket using the instance of the server
const io = socketIO(server)
var lobbySocket = io.of('/lobby');

// This is what the socket.io syntax is like
lobbySocket.on('connection', socket => { 
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('create room', (format, roomID) => {
  	console.log('creating room: ' + roomID + ' format: ' + format);
    const room = new Room(format, roomID)
  	rooms.push(room);
  })

  socket.on('roomlist', () => {
    socket.emit('roomlist', rooms);
  })

  socket.on('joinroom', (roomID) => {
    console.log('joining ' + roomID);
    socket.join(roomID);
  })

})



server.listen(port, () => console.log(`Listening on port ${port}`))