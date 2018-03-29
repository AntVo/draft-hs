import React, { Component } from 'react';
import Login from './Login';
import Lobby from './Lobby';
import Draft from './Draft';
import Navigation from './Navigation';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router path="/">
        <div id="app">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/draft" component={Draft} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
