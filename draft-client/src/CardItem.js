import React, { Component } from 'react';
import axios from 'axios';

export default class CardItem extends Component {
  handleClick = () => {
    this.props.selectCard(this.props.card);
  }

  render(){
    let style = {};
    (this.props.pick === this.props.card) ? style = { border: '4px solid lightGreen' } : style = {};

    return (
      <div className="card-item">
        <img style={style} onClick={this.handleClick} src={this.props.img} />
      </div>
  )}
}
