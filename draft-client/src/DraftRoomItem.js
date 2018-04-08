import React, { Component } from 'react';

export default class DraftRoomItem extends Component {

	render(){
		return (
		  <div>
		  	<div id="draft-room-item">
      		{this.props.room.roomID}
      		<br></br>
      		{this.props.room.format}
                  <div>
                  {this.props.room.drafters.length}
                  </div>
      		<button className="button is-primary" id="join-button" onClick={this.props.joinRoom.bind(this, this.props.room.roomID)}>join</button>
      		<button className="button is-warning" id="delete-button">delete</button>
      	</div>
      </div>
	)}
}
