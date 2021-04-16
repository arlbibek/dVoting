import React from "react";

const ElectionStatus = (props) => {
  return (
    <div
      className="container-main"
      style={{ borderTop: "1px solid", marginTop: "0px" }}
    >
      <h3>Election Status</h3>
      <div className="election-status">
        <p>Started: {props.elStarted ? "True" : "False"}</p>
        <p>Ended: {props.elEnded ? "True" : "False"}</p>
      </div>
      <div className="container-item" />
    </div>
  );
};

export default ElectionStatus;
