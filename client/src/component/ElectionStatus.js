import React from "react";

const ElectionStatus = (props) => {
  const electionStatus = {
    padding: "11px",
    margin: "7px",
    width: "100%",
    border: "1px solid tomato",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    borderRadius: "0.5em",
    overflow: "auto",
    alignItems: "center",
    justifyContent: "space-around",
    display: "flex",
  };
  return (
    <div
      className="container-main"
      style={{ borderTop: "1px solid", marginTop: "0px" }}
    >
      <h3>Election Status</h3>
      <div style={electionStatus}>
        <p>Started: {props.elStarted ? "True" : "False"}</p>
        <p>Ended: {props.elEnded ? "True" : "False"}</p>
      </div>
      <div className="container-item" />
    </div>
  );
};

export default ElectionStatus;
