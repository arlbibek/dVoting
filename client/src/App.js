import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AddCandidate from "./component/AddCandidate";
import Home from "./component/Home";
import Voting from "./component/Voting";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/AddCandidate" component={AddCandidate} />
            <Route exact path="/Voting" component={Voting} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <>
        <h1>404 NOT FOUND!</h1>
        <center>The page your are looking for doesn't exists.</center>
      </>
    );
  }
}
