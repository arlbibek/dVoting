import React, { Component } from "react";

import Navbar from "./Navbar/Navigation";
import NavbarAdmin from "./Navbar/NavigationAdmin";

import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";
import { Link } from "react-router-dom";

import "./Voting.css";

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      account: null,
      web3: null,
      isAdmin: false,
      candidateCount: undefined,
      candidates: [],
      isElStarted: false,
      isElEnded: false,
    };
  }
  componentDidMount = async () => {
    // refreshing once
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, ElectionInstance: instance, account: accounts[0] });

      // Get total number of candidates
      const candidateCount = await this.state.ElectionInstance.methods
        .getCandidateNumber()
        .call();
      this.setState({ candidateCount: candidateCount });

      // Get start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ isElStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ isElEnded: end });

      // Loadin Candidates detials
      for (let i = 1; i <= this.state.candidateCount; i++) {
        const candidate = await this.state.ElectionInstance.methods
          .candidateDetails(i - 1)
          .call();
        this.state.candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          slogan: candidate.slogan,
        });
      }

      this.setState({ candidates: this.state.candidates });
      console.log(this.state.candidates);

      // Admin account and verification
      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }

    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <center>Total Candidates: {this.state.candidateCount}</center>
        <br />
        <div>
          {!this.state.isElStarted && !this.state.isElEnded ? (
            <>
              <h3>The election has never been initialize.</h3>
              <center>
                <p>Please Wait..</p>
              </center>
            </>
          ) : this.state.isElStarted && !this.state.isElEnded ? (
            <>
              <h3>Go ahead and cast your vote.</h3>
              {voteCandidates(this.state.candidates)}
              {/* {voteCandidates(candidatesData)} */}
            </>
          ) : !this.state.isElStarted && this.state.isElEnded ? (
            <>
              <h3>The Election ended.</h3>
              <br />
              <center>
                <Link
                  to="/Results"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  See results
                </Link>
              </center>
            </>
          ) : null}
        </div>
      </>
    );
  }
}
export function voteCandidates(candidates) {
  const confirmVote = (id, header) => {
    var r = window.confirm("Vote for " + header + "\nAre you sure?");
    if (r === true) {
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
          {/* <p className="contact">{candidates.contact}</p> */}
          <p className="slogan">{candidates.slogan}</p>
          {/* <p className="discription">{candidates.discription}</p> */}
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
    <div className="all-candidates">
      <h2>Candidates</h2>
      {candidates.map(renderCandidates)}
    </div>
  );
}
