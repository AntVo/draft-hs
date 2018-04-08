import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// this.props.match.params.id is the router parameter
// this.props.user 
// Todo implement a pregame lobby (Ready up, see seats green, start game)

export default class DraftRoom extends Component {

	constructor(props){
	      super(props)
	      this.state = {
	      	 endpoint: "http://127.0.0.1:4001/lobby",
	      	 user: null,
	      	 stage: "pregame",
	      	 drafters: [],
	    	};
	      this.socket = socketIOClient(this.state.endpoint);
	      this.socket.on('userjoined', (data) => {
	      	console.log(data);
	      })
	 }

	 componentDidMount(){
	 	   this.socket.emit('joinroom', this.props.match.params.id, this.props.user);  
	 }



	render(){
		return (
        <div>
        	{this.state.drafters}
        </div>
		)
	}
}
