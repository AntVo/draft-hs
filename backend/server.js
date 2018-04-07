const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const index = require("./index")
const router = express.Router();
const axios = require('axios');
const sets = require('./sets.js');
// our localhost port
const port = 4001;

const app = express();
app.use(index);
// our server instance
const server = http.createServer(app)

class Room {
  constructor(format, roomID){
    this.roomID = roomID;
    this.drafters = [];
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
    room.drafters.forEach((drafter) => {
      drafter.pack = createPack(room.format);
    })

    for (var i = 0; i < 15; i++) {

    }

   // while peoples packs are not empty,
   // user picks a card and puts it in
   // passes to next
}

// returns a randomized pack (1 legendary, 2 epics, 4 rares, 8 commons)
// TODO: Optimization, Create 25 packs instead of runniing create pack 25 times.
function createPack(format){
  const pack = [];
  const legendaries = sets[`${format}`].legendaries;
  const epics = sets[`${format}`].epics;
  const rares = sets[`${format}`].rares;
  const commons = sets[`${format}`].commons;

  pack.push(legendaries[Math.floor(Math.random()*legendaries.length)]); // add legendary
  for (var i = 0; i < 2; i++){   // add 2 epics
    pack.push(epics[Math.floor(Math.random()*epics.length)]);
  }
  for (var i = 0; i < 4; i++){   // add 4 rares
    pack.push(rares[Math.floor(Math.random()*rares.length)]);
  }
  for(var i = 0; i < 8; i++){    // add 8 commons
    pack.push(commons[Math.floor(Math.random()*commons.length)]);
  }
  console.log(pack);
  return pack;
}

// Mock Database 
// A room should have { roomID, format, packs}
const rooms = {};

// This creates our socket using the instance of the server
const io = socketIO(server)
var lobbySocket = io.of('/lobby');

// This is what the socket.io syntax is like
lobbySocket.on('connection', socket => { 
  // socket.id
  console.log('User connected')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })


  socket.on('create room', (format) => {
    const length = Object.keys(rooms).length
  	console.log('creating room: ' + length + ' format: ' + format);
    const room = new Room(format, length)
  	rooms[length] = room;
    socket.emit('create room', rooms);
    socket.emit('roomlist', rooms);
  })

  socket.on('roomlist', () => {
    socket.emit('roomlist', rooms);
  })

  socket.on('joinroom', (roomID, username) => {
    console.log(username + ' is joining ' + roomID);

    const drafter = new Drafter(socket.id, username);
    rooms[roomID].drafters.push(drafter);

    const length = Object.keys(rooms[roomID].drafters).length;
    console.log('number of players in room: ' + length);
    console.log(rooms[roomID].drafters);
    socket.join(roomID);
  })

  // Socket Room methods
})


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

