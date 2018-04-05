import React, { Component } from 'react';

export default class DraftRoomItem extends Component {


	render(){
		return (
		  <div>
		  	<div id="draft-room-item">
      		{this.props.room.roomID}
      		<br></br>
      		{this.props.room.roomFormat}
      		<button className="button is-primary" id="join-button">join</button>
      	</div>
      </div>
	)}
}
