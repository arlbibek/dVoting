import React, { Component } from "react";

import Navbar from "./Navigation";
import NavbarAdmin from "./NavigationAdmin";

import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";

import { FormGroup, FormControl, Button, Form } from "react-bootstrap";

import "./AddCandidate.css";

export default class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electionContract: undefined,
      web3: null,
      accounts: null,
      isAdmin: false,
      header: "",
      slogan: "",
      candidates: null,
    };
  }

  componentDidMount = async () => {
    // refreshing page only once
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
      const electionInstance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        electionContract: electionInstance,
        account: accounts[0],
      });

      const admin = await this.state.electionContract.methods.getAdmin().call();
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
  updateHeader = (event) => {
    this.setState({ header: event.target.value });
  };
  updateSlogan = (event) => {
    this.setState({ slogan: event.target.value });
  };

  addCandidate = async () => {
    await this.state.electionContract.methods
      .addCandidate(this.state.header, this.state.slogan)
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload(false);
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
    if (!this.state.isAdmin) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <center>Admin Access Only...</center>
        </>
      );
    }
    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <h1>Add Candidate page</h1>
        <center>This is where you add new candidate</center>
        <div className="addCandidate-form">
          <FormGroup>
            <label>Candidate Name</label>
            <FormControl
              input="text"
              value={this.state.header}
              onChange={this.updateHeader}
            />
          </FormGroup>
          <FormGroup>
            <label>Slogan</label>
            <FormControl
              input="text"
              value={this.state.slogan}
              onChange={this.updateSlogan}
            />
          </FormGroup>
          <Button onClick={this.addCandidate}>Add</Button>
        </div>
      </>
    );
  }
}
