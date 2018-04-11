import React, { Component } from 'react';
import axios from 'axios';
import CardItem from './CardItem';
export default class DraftGallery extends Component {


  constructor(props){
        super(props)

   }

  renderSection(){
    return (
      this.props.pack.map((item)=> {
        return <CardItem card={item} selectCard={this.props.selectCard} pick={this.state.pick}/>
      })
    )
  }

	render(){ 
		return (
		  <div id="draft-gallery">
        {this.renderSection()}
      </div>
	)}
}
