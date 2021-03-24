import React, { Component } from "react";

import Navbar from "./Navbar/Navigation";
import NavbarAdmin from "./Navbar/NavigationAdmin";

import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";
import { Link } from "react-router-dom";

import "./Results.css";

export default class Result extends Component {
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
          voteCount: candidate.voteCount,
        });
      }

      this.setState({ candidates: this.state.candidates });

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
              <h3>The election is being conducted at the movement.</h3>
              <center>
                <p>Result will be displayed once the election has ended.</p>
                <p>Go ahead and cast your vote (if you've not already).</p>
                <Link to="/Voting">Voting Page</Link>
              </center>
            </>
          ) : !this.state.isElStarted && this.state.isElEnded ? (
            <>
              {/* <h3>The Election ended.</h3> */}
              {displayResults(this.state.candidates)}
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export function displayResults(candidates) {
  const renderResults = (candidates) => {
    return (
      <tr>
        <td>{candidates.id}</td>
        <td>{candidates.header}</td>
        <td>{candidates.voteCount}</td>
      </tr>
    );
  };
  return (
    <div className="results">
      <h2>Results</h2>
      <div className="results-container">
        <table>
          <tr>
            <th>Id</th>
            <th>Candidate</th>
            <th>Votes</th>
          </tr>
          {candidates.map(renderResults)}
        </table>
      </div>
    </div>
  );
}
