import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";
import Registration from "./pages/registration/Registration";
import Voting from "./pages/voting/Voting";
import Results from "./pages/results/Results";
import { Route } from "react-router-dom";
import "./App.css";

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
