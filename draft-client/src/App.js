import React, { Component } from 'react';
import Login from './Login';
import Lobby from './Lobby';
import Draft from './Draft';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client'
import './App.css';

class App extends Component {

constructor(props){
      super(props)
      this.state = {
        user: null,
        endpoint: "http://127.0.0.1:4001",

    };
 }

loginUser = (username) => {
  const socket = socketIOClient(this.state.endpoint);
  this.setState({ user: username });
}

render() {
    return (
      <Router path="/">
        <div id="app">
          <Switch>
            <Route exact path="/" render={() => this.state.user ? <Redirect to="/lobby" /> : <Login loginUser={this.loginUser} />} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/draft" component={Draft} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
