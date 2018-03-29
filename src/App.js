import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Lobby from './Lobby';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router path="/">
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/lobby" component={Lobby} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
