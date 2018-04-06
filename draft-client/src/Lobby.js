import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import DraftRoomItem from './DraftRoomItem.js';
import { Route, Redirect } from 'react-router'

export default class Lobby extends Component {

	constructor(props){
	      super(props)
	      this.state = {
	        user: null,
	        endpoint: "http://127.0.0.1:4001/lobby",
	        roomlist: [],
	        formValue: '',
	        redirect: false,
	    };
	    this.socket = socketIOClient(this.state.endpoint);
	 }

	componentDidMount(){
		this.socket.emit('roomlist');
		this.socket.on('roomlist', (roomlist) => {
       this.setState({ roomlist: roomlist })
    })
	}

	createRoom = (event) => { 
		event.preventDefault();
		const roomID = Math.floor(Math.random()*9999).toString(); 
		const roomFormat = this.refs.format.value;
    this.socket.emit('create room', roomFormat, roomID);
    this.socket.emit('roomlist');
    this.socket.on('roomlist', (roomlist) => {
       this.setState({ roomlist: roomlist })
    })
	}

	joinRoom = (roomID) => {
		this.socket.emit('joinroom', roomID);
		this.setState({ redirect: true })
	} 

	renderRoomList = () => {
    return this.state.roomlist.map((room, index) => 
      <DraftRoomItem key={index} 
                	   room={room}
                	   joinRoom={this.joinRoom}
      />);
	}

	handleChange = (event) =>{
		this.setState({ formValue: event.target.value })
	}

  render() {
  	return(
  			(this.state.redirect === true) ?
		 			<Redirect to="/room/3153"/> 
		 			: 
	 				<div>
	 					<form onSubmit={this.createRoom} >
	 						<select value={this.state.formValue} onChange={this.handleChange} ref="format">
	 							<option value="classic">classic</option>
	 							<option value="custom">antoine special</option>
	 						</select>
	 						<button className="button is-success">Create a Room</button>
	 					</form>
	 					{this.renderRoomList()}
	 				</div>
      )
    }

  }
