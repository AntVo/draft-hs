import React, { Component } from 'react';
import axios from 'axios';
import CardItem from './CardItem';
export default class DraftGallery extends Component {


  constructor(props){
        super(props)

   }



  async getData(card){
    console.log('getting data');
    let res = await axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/${card}?collectible=1`, {headers: {"X-Mashape-Key": "a12ngyGLHymsh3VwqbA8wkQ8BBZep1RZPKCjsnw7jAI9mfhnFi"}})
    const data = await res.data[0].img;
    this.setState({ img: data});
  }



  renderSection(){

    return (
      this.props.pack.map((item)=> {
        return <CardItem card={item} selectCard={this.props.selectCard} pick={this.props.pick}/>
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
