import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <br />
      <br />
      <br />
      <footer>
        <h3 style={{ textAlign: "center" }}>
          Made with <i class="fas fa-heartbeat"></i> by{" "}
          <a
            style={{ color: "black", textDecoration: "underline" }}
            title="Visit my Portfolio"
            href="https://arlbibek.github.io/"
          >
            Bibek Aryal
          </a>
        </h3>
      </footer>
    </>
  );
}

export default Footer;
