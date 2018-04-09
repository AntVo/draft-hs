import React, { Component } from 'react';
import DraftGallery from './DraftGallery';
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
	      	 pack: null,
	    	};
	      this.socket = socketIOClient(this.state.endpoint);
	      this.socket.on('userjoined', (data) => {
	      	this.setState({ drafters: data });
	      })
	      this.socket.on('getpack', (pack) => {
	      	this.setState({ pack: pack });
	      })
	      this.socket.on('draftstarted', () => {
	      	this.setState({ stage: "drafting" });
	      })

	 }

	 componentDidMount(){
	 	    this.socket.emit('joinroom', this.props.match.params.id, this.props.user);  
	 }

	 startDraft = () => {
	    this.setState({ stage: "drafting" });
	    this.socket.emit('startdraft', this.props.match.params.id);
	    //SOCKET SOCKET SOMETHING SOMETHING
	 }

	renderSection(){
		if (this.state.stage === "pregame"){
				return(
					<div>
						{this.state.drafters.map((item) => <div>{item.name}</div>)}
						<button onClick={this.startDraft} className="button is-success">Start Draft!</button>
					</div>
				)
		}
		else if (this.state.stage === "drafting"){
			<DraftGallery pack={this.state.pack}/>
		}
		else if (this.state.stage === "deckbuilding"){

		}

	}

	render(){
	  this.socket.emit('userjoined', this.state.drafters);
		return (
        <div>
        	{this.renderSection()}
        </div>
		)
	}
}
