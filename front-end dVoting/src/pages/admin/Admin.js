import React from "react";
import "./admin.css";

function Admin() {
  return (
    <>
      <h1>Admin page.</h1>
      {/* Admin Login */}
      <div className="admin-login">
        <h2 style={{ textAlign: "center" }}>Admin?</h2>
        <div className="form-content">
          <form>
            <label>Login</label>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      {/* Electon Register */}
      <div className="admin-register">
        <h2 style={{ textAlign: "center" }}>New? Create Election</h2>
        {/* About Admin */}
        <div className="election-detials">
          <h3>About Admin</h3>
          <div className="form-content">
            <form>
              <label>Full Name</label>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <label>Email</label>
              <input type="email" placeholder="eg. you@example.com" />
              <label>Password</label>
              <input type="password" placeholder="Password" />
              <label>Job Title or Postion</label>
              <input type="text" placeholder="eg. HR Head " />
              <input style={{ float: "right" }} type="reset" value="Clear" />
            </form>
          </div>
        </div>
        {/* About Elcetion */}
        <div className="election-detials">
          <h3>About Election</h3>
          <form>
            <label>Organization Name and Location</label>
            <input type="text" placeholder="eg. Lifeline Academy" />
            <input type="text" placeholder="eg. Baitadi, Nepal" />
            <label>Electoin Title</label>
            <input type="text" placeholder="eg. School Election" />
            <input style={{ float: "right" }} type="reset" value="Clear" />
          </form>
        </div>
        <div className="election-detials">
          <h3>User Validation Method</h3>
          <label> Candidate list</label>
          <input type="button" value="Browse" />
          <label> Voter list</label>
          <input type="button" value="Browse" />
        </div>
        <button type="submit">Submit Election Form</button>
      </div>
    </>
  );
}
export default Admin;
