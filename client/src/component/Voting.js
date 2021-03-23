import React, { Component } from "react";

import Navbar from "./Navbar/Navigation";
import NavbarAdmin from "./Navbar/NavigationAdmin";

import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";
import { Link } from "react-router-dom";

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      account: null,
      web3: null,
      isAdmin: false,
      candidateCount: undefined,
      candidates: null,
      isElStarted: false,
      isElEnded: false,
    };
  }
  // refreshing once

  componentDidMount = async () => {
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
      // // Candidates detials
      // // FIND SOLUTION
      // const candidate = await this.state.ElectionInstance.candidateDetails[0];
      // this.setState({ candidates: candidate });
      // console.log(this.state.candidates);

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
        <h1>Voting page</h1>
        <center>This is where you cast a vote</center>
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
              <center>
                <h1>Voter list</h1>
                <ul>Candidate 1</ul>
                <ul>Candidate 2</ul>
                <ul>Candidate 3</ul>
                <ul>Candidate 4</ul>
              </center>
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
