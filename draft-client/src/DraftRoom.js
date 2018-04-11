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
	      	 pick: null,
	      	 timer: null,
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
	      this.socket.on('timer', (time)=>{
	      	this.setState({ timer: time });
	      })
	 }


	 componentDidMount(){
	 	  this.socket.emit('joinroom', this.props.match.params.id, this.props.user);  
	 }

	 startDraft = () => {
	    this.setState({ stage: "drafting" });
	    this.socket.emit('startdraft', this.props.match.params.id);
	 }

	 selectCard = (card) => {
    this.setState({ pick: card });
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
		if (this.state.stage === "drafting" && this.state.pack !== null){
			return(
				<div>
					<p>{this.state.timer}</p>
					<DraftGallery pack={this.state.pack} selectCard={this.selectCard} pick={this.state.pick}/>
				</div>
			)
		}
		if (this.state.stage === "deckbuilding"){

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
