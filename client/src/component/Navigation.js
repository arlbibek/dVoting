import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <Router>
        <Link to="/" className="header">
          Home
        </Link>
        <ul
          className="navbar-links"
          style={{ width: "35%", transform: open ? "translateX(0px)" : "" }}
        >
          <li>
            <Link to="/Voting">Voting</Link>
          </li>
          <li>
            <Link to="/Candidates">Candidates</Link>
          </li>
          <li>
            <Link to="/Results">Results</Link>
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
