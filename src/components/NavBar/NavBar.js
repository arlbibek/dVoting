import React from "react";
import {Link} from "react-router-dom"

import "./NavBar.css";

function NavBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">
            <i class="fab fa-hive"></i> HOME
          </Link>
        </div>
        <ul
          className="navbar-links"
          style={{ transform: open ? "translateX(0px)" : "" }}
        >
          <li>
            <Link to="/admin">
              <i class="far fa-user"></i> Admin
            </Link>
          </li>
          <li>
            <Link to="/registration">
              <i class="far fa-registered"></i> Registration
            </Link>
          </li>
          <li>
            <Link to="/voting">
              <i class="fas fa-vote-yea"></i> Voting
            </Link>
          </li>
          <li>
            <Link to="/results">
              <i class="fas fa-poll-h"></i> Results
            </Link>
          </li>
        </ul>
        <i
          onClick={() => setOpen(!open)}
          className="fas fa-bars burger-menu"
        ></i>
      </nav>
    </div>
  );
}

export default NavBar;
