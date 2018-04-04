import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import DraftRoom from './DraftRoom.js';

export default class Lobby extends Component {

	constructor(props){
	      super(props)
	      this.state = {
	        user: null,
	        endpoint: "http://127.0.0.1:4001/lobby",
	        roomlist: [],
	    };
	    this.socket = socketIOClient(this.state.endpoint);
	 }


	createRoom = () => { 
		const roomName = Math.floor(Math.random()*9999).toString(); 
    this.socket.emit('create room', roomName);
    this.socket.emit('roomlist');
    this.socket.on('roomlist', (roomlist) => {
       this.setState({ roomlist: roomlist })
    })
	}



	renderRoomList(){
    return this.state.roomlist.map((room, index) => 
      <DraftRoom key={index} 
                 room={room}
      />);
	}

  render() {
      return (
 				<div>
 					<button className="button is-success" onClick={this.createRoom}>Create a Room</button>
 					{this.renderRoomList()}
 				</div>
      )
    }

  }
