import React from "react";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Registration from "./pages/Registration";
import Voting from "./pages/Voting";
import Results from "./pages/Results";

import { Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/voting" component={Voting} />
      <Route exact path="/results" component={Results} />
      <Footer />
    </div>
  );
}

export default App;
