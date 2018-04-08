import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import DraftRoomItem from './DraftRoomItem.js';
import { Redirect } from 'react-router'

export default class Lobby extends Component {

	constructor(props){
	      super(props)
	      this.state = {
	        user: null,
	        endpoint: "http://127.0.0.1:4001/lobby",
	        roomlist: {}, 
	        formValue: '',
	        redirect: -1,
	    };
	    this.socket = socketIOClient(this.state.endpoint);
	    this.socket.on('roomlist', (roomlist) => {
	    		this.setState({ roomlist: roomlist });
	    });
	 }

	componentDidMount(){
    this.socket.emit('roomlist');
	}

	createRoom = (event) => { 
		event.preventDefault();
		const roomFormat = this.refs.format.value;
    this.socket.emit('create room', roomFormat);
	}

	joinRoom = (roomID) => {
		this.setState({ redirect: roomID })
	} 

	renderRoomList = () => {
		const roomListArray = Object.values(this.state.roomlist);
    return roomListArray.map((room, index) => 
      <DraftRoomItem key={index} 
                	   room={room}
                	   joinRoom={this.joinRoom}
      />);
	}

	handleChange = (event) =>{
		this.setState({ formValue: event.target.value })
	}

  render() {
  	let route = null;
  	this.socket.emit('roomlist', this.state.roomlist);

  	if (this.state.redirect !== -1){
  		route = <Redirect to={{
  			pathname: `/room/${this.state.redirect}`,
  		}}/> 
  	} else {
  		route = 
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
  	}

  	return(route);
    }

  }
