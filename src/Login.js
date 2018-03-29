import React, { Component } from 'react';

export default class Login extends Component {


  render() {
      return (
 				<div id="login-screen">
 					<div id="login-form">
						<input class="input is-info login" type="text" placeholder="Guest Name"></input>
						<a class="button is-light login">Join</a>
					</div>
 				</div>
      );
    }

  }
