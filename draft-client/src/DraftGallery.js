import React, { Component } from 'react';
import axios from 'axios';
import CardItem from './CardItem';
export default class DraftGallery extends Component {



  renderGallery = () => {
      const array = [];
      this.props.pack.map((card) => {
        axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/${card}`, {headers: {"X-Mashape-Key": "a12ngyGLHymsh3VwqbA8wkQ8BBZep1RZPKCjsnw7jAI9mfhnFi"}})
          .then(res => {
            console.log(res.data);
            array.push(<CardItem img={res.data.img} />);
          })
      })
      return array;
  }

	render(){
		return (
		  <div>
		  	{this.renderGallery()}
      </div>
	)}
}
