import React, { Component } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Navbar from "./Navbar/Navigation";
import NavbarAdmin from "./Navbar/NavigationAdmin";

import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      account: null,
      web3: null,
      isAdmin: false,
      elStarted: false,
      elEnded: false,
      elDetails: {},
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
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      });

      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      // Get election start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ elStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ elEnded: end });

      // Geting election details from the contract
      const adminName = await this.state.ElectionInstance.methods
        .getAdminName()
        .call();
      const adminEmail = await this.state.ElectionInstance.methods
        .getAdminEmail()
        .call();
      const adminTitle = await this.state.ElectionInstance.methods
        .getAdminTitle()
        .call();
      const electionTitle = await this.state.ElectionInstance.methods
        .getElectionTitle()
        .call();
      const organizationTitle = await this.state.ElectionInstance.methods
        .getOrganizationTitle()
        .call();

      this.setState({
        elDetails: {
          adminName: adminName,
          adminEmail: adminEmail,
          adminTitle: adminTitle,
          electionTitle: electionTitle,
          organizationTitle: organizationTitle,
        },
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  // end election
  endElection = async () => {
    await this.state.ElectionInstance.methods
      .endElection()
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };
  // register and start election
  registerElection = async (data) => {
    await this.state.ElectionInstance.methods
      .setElectionDetails(
        data.adminFName.toLowerCase() + " " + data.adminLName.toLowerCase(),
        data.adminEmail.toLowerCase(),
        data.adminTitle.toLowerCase(),
        data.electionTitle.toLowerCase(),
        data.organizationTitle.toLowerCase()
      )
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };
  render() {
    if (!this.state.web3) {
      return (
        <>
          <Navbar />
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <div className="container-main">
          <div className="container-item center-items info">
            Your Account: {this.state.account}
          </div>
          {!this.state.elStarted & !this.state.elEnded ? (
            <div className="container-item info">
              <center>The election have never been initiated.</center>
            </div>
          ) : null}
        </div>
        {this.state.isAdmin ? (
          <>
            <this.renderAdminHome />
          </>
        ) : this.state.elStarted ? (
          <>
            <UserHome {...this.state.elDetails} />
          </>
        ) : !this.state.isElStarted && this.state.isElEnded ? (
          <>
            <div className="container-item attention">
              <center>
                <h3>The Election ended.</h3>
                <br />
                <Link
                  to="/Results"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  See results
                </Link>
              </center>
            </div>
          </>
        ) : null}
      </>
    );
  }
  renderAdminHome = () => {
    const EMsg = (props) => {
      return <span style={{ color: "tomato" }}>{props.msg}</span>;
    };
    const AdminHome = () => {
      // Contains of Home page for the Admin

      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        this.registerElection(data);
      };

      return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!this.state.elStarted & !this.state.elEnded ? (
              <div className="container-main">
                <h3>About Admin</h3>
                <div className="container-item center-items">
                  <div>
                    <label className="label">
                      Full Name {errors.adminFName && <EMsg msg="*required" />}
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="First Name"
                      {...register("adminFName", {
                        required: true,
                      })}
                    />
                    <input
                      className="input"
                      type="text"
                      placeholder="Last Name"
                      {...register("adminLName")}
                    />

                    <label className="label">
                      Email{" "}
                      {errors.adminEmail && (
                        <EMsg msg={errors.adminEmail.message} />
                      )}
                    </label>
                    <input
                      className="input"
                      placeholder="eg. you@example.com"
                      name="adminEmail"
                      {...register("adminEmail", {
                        required: "*Required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // email validation using RegExp
                          message: "*Invalid",
                        },
                      })}
                    />

                    <label className="label">
                      Job Title or Postion{" "}
                      {errors.adminTitle && <EMsg msg="*required" />}
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="eg. HR Head "
                      {...register("adminTitle", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <h3>About Election</h3>
                <div className="container-item center-items">
                  <div>
                    <label className="label">
                      Electoin Title{" "}
                      {errors.electionTitle && <EMsg msg="*required" />}
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="eg. School Election"
                      {...register("electionTitle", {
                        required: true,
                      })}
                    />
                    <label className="label">
                      Organization Name{" "}
                      {errors.organizationName && <EMsg msg="*required" />}
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="eg. Lifeline Academy"
                      {...register("organizationTitle", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                {/* <h3>Voter Validation Method</h3>
              <div className="container-item center-items">
              <label>
              Validation email list{" "}
              {errors.validVoterEmail && <EMsg msg="*required" />}
              </label>
              <textarea
                  style={{ resize: "vertical" }}
                  className="input"
                  rows="7"
                  cols="fixed"
                  name="text"
                  placeholder="Paste list of valid emails for Voter validation
                Eg:
                employe1@example.com
                employe2@example.com
                employe3@example.com
                so on.."
                  {...register("validVoterEmail", {
                    required: true,
                  })}
                  />
                </div> */}
              </div>
            ) : this.state.elStarted ? (
              <UserHome {...this.state.elDetails} />
            ) : null}
            <div
              className="container-main"
              style={{ borderTop: "1px solid", marginTop: "0px" }}
            >
              {!this.state.elStarted ? (
                <>
                  {/* edit here to start election Again */}
                  {!this.state.elEnded ? (
                    <div className="container-item">
                      <button type="submit" className="start-btn">
                        Start Election {this.state.elEnded ? "Again" : null}
                      </button>
                    </div>
                  ) : (
                    <div className="container-item">
                      <center>
                        <p>Re-deploy the contract to start election again.</p>
                      </center>
                    </div>
                  )}
                  {this.state.elEnded ? (
                    <div className="container-item">
                      <center>
                        <p>The election ended.</p>
                      </center>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="container-item">
                    <center>
                      <p>The election started.</p>
                    </center>
                  </div>
                  <div className="container-item">
                    <button
                      type="button"
                      onClick={this.endElection}
                      className="start-btn"
                    >
                      End
                    </button>
                  </div>
                </>
              )}
              <h3>Election Status</h3>
              <div className="election-status">
                <p>Started: {this.state.elStarted ? "True" : "False"}</p>
                <p>Ended: {this.state.elEnded ? "True" : "False"}</p>
              </div>
            </div>
          </form>
        </>
      );
    };

    return <AdminHome />;
  };
}

const UserHome = (el) => {
  return (
    <div>
      <div className="container-main">
        <div className="container-list title">
          <h1>{el.electionTitle}</h1>
          <br />
          <center>{el.organizationTitle}</center>
          <table style={{ marginTop: "21px" }}>
            <tr>
              <th>admin</th>
              <td>
                {el.adminName} ({el.adminTitle})
              </td>
            </tr>
            <tr>
              <th>contact</th>
              <td style={{ textTransform: "none" }}>{el.adminEmail}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
