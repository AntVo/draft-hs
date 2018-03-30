var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socket(server);

console.log("Socket server is running");

app.use(express.static('public'));
io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection' + socket.id);
	socket.on('mouse', mouseMessage);
	
	function mouseMessage(data){
		socket.broadcast.emit('mouse', data);
		console.log(data);
	}
}
