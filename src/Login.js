import React, { Component } from 'react';
import Redirect from 'react-router-dom';
export default class Login extends Component {

	handleLogin = (event) => {		
		event.preventDefault();
		this.props.loginUser(this.refs.username.value);
	}

  render() {
      return (
 				<div id="login-screen">
 					<form id="login-form" onSubmit={this.handleLogin}>
						<input class="input is-info login" type="text" placeholder="Guest Name" ref="username"></input>
						<button class="button is-light login">Join</button>
					</form>
 				</div>
      );
    }

  }
