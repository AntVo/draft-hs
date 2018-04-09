import React, { Component } from 'react';
import axios from 'axios';

export default class CardItem extends Component {

  render(){
    return (
      <div>
        <img src={this.props.img} />
      </div>
  )}
}
