const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const index = require("./index")
const router = express.Router();


// our localhost port
const port = 4001;

const app = express();
app.use(index);
// our server instance
const server = http.createServer(app)

// Mock Database 
const rooms = [];

// This creates our socket using the instance of the server
const io = socketIO(server)
var lobbySocket = io.of('/lobby');

// This is what the socket.io syntax is like, we will work this later
lobbySocket.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('create room', (name) => {
  	console.log('creating room: ' + name);
  	rooms.push( { roomName: name } );
  })

  socket.on('roomlist', () => {
    socket.emit('roomlist', rooms);
  })


})



server.listen(port, () => console.log(`Listening on port ${port}`))