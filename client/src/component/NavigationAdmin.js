import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./Navbar.css";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <Router>
        <div className="header">
          <Link to="/">Admin</Link>
        </div>
        <ul
          className="navbar-links"
          style={{ transform: open ? "translateX(0px)" : "" }}
        >
          <li>
            <Link to="/Candidates">Candidates</Link>
          </li>
          <li>
            <Link to="/Registration">Registration</Link>
          </li>
          <li>
            <Link to="/Voting">Voting</Link>
          </li>
          <li>
            <Link to="/VerifyVoter">Verification</Link>
          </li>
          <li>
            <Link to="/AddCandidate">Add Candidate</Link>
          </li>
          <li>
            <Link to="/Result">Result</Link>
          </li>
          <li>
            <Link to="/Admin">Start/End</Link>
          </li>
        </ul>
        <i
          onClick={() => setOpen(!open)}
          className="fas fa-bars burger-menu"
        ></i>
      </Router>
    </nav>
  );
}
