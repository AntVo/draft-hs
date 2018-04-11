import React, { Component } from 'react';
import axios from 'axios';

export default class CardItem extends Component {
  constructor(props){
        super(props)
        this.state = {
          img: null,
        }
   }

  async getData(card){
    let res = await axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/${card}?collectible=1`, {headers: {"X-Mashape-Key": "a12ngyGLHymsh3VwqbA8wkQ8BBZep1RZPKCjsnw7jAI9mfhnFi"}})
    const data = await res.data[0].img;
    this.setState({ img: data});
  }

  componentDidMount(){
    if (!this.state.img){
      this.getData(this.props.card);
    }
  }

  handleClick = () => {
    this.props.selectCard(this.props.card);
  }

  render(){
    let style = {};
    (this.props.pick === this.props.card) ? style = { border: '4px solid lightGreen' } : style = {};

    return (
      <div className="card-item">
        <img style={style} onClick={this.handleClick} src={this.state.img} />
      </div>
  )}
}
