import React, { Component } from "react";
import "./voting.css";

function Voting() {
  const candidates = require("../../Data/candidates.json");

  const confirmVote = (id, header) => {
    var r = window.confirm("Vote for " + header + "\nAre you sure?");
    if (r == true) {
      alert("You've Voted for " + header + " #" + id);
    }
  };

  const renderCandidates = (candidates) => {
    return (
      <div className="candidate-container">
        <div className="candidate-info">
          <h2>
            {candidates.header} <small>#{candidates.id}</small>
          </h2>
          <p className="contact">{candidates.contact}</p>
          <p className="slogan">{candidates.slogan}</p>
          <p className="discription">{candidates.discription}</p>
        </div>
        <div class="vote-btn-container">
          <button
            type="button"
            className="vote-btn"
            onClick={() => confirmVote(candidates.id, candidates.header)}
          >
            Vote
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <h1>Voting Page</h1>
      <div className="all-candidates">
        <h2>Candidates</h2>
        {candidates.map(renderCandidates)}
      </div>
    </>
  );
}

export default Voting;
