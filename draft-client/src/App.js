import React, { Component } from 'react';
import Login from './Login';
import Lobby from './Lobby';
import Navigation from './Navigation';
import DraftRoom from './DraftRoom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
  this.setState({ user: username });
}

render() {
    return (
      <Router path="/">
        <div id="app">
          <Switch>
            <Route exact path="/" render={(props) => this.state.user ? <Redirect to="/lobby" /> : <Login {...props} loginUser={this.loginUser} />} />
            <Route path="/lobby" render={(props) => <Lobby {...props} user={this.state.user}/> } />
            <Route path="/room/:id" component={(props) => <DraftRoom {...props} user={this.state.user} /> }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
