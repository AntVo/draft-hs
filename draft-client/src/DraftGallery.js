import React, { Component } from 'react';
import Axios from 'axios';

export default class DraftGallery extends Component {

  renderGallery = () => {
    this.props.pack.map((card)=> {
      // AXIOS DAT CARD THOUGH.

    })
  }

	render(){
		return (
		  <div>
		  	{this.renderGallery}
      </div>
	)}
}
