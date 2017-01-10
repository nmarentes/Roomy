import React, { Component } from 'react';
import { broswerHistory, Link } from 'react-router';

const Login = (props) => {
  console.log(props);
    return (
      <div className="wrapper">
        <div className="container">
          <header><h1>Get a Room</h1></header>
        </div>
      <div id="container" className="app-container">
      <div id="herobox"></div>
        <div id="hero">
          <h2><span>Disrupt</span> Room Scheduling.</h2>
          <p>Tired of not getting a room when you want a room?<br />Let <span>Get a Room</span> get you a room when you want a room.</p>
        </div>
        <div id="adminfield" className="admin-field">
          <h3>Log in </h3>
          <div id="forms" className="forms">
            <div><label>Username:</label> <input id="username" onChange={props.children.username} className="username" /></div>
            <div><label>Password:</label> <input type="password" id="password"  onChange={props.children.password} className="password" /></div> 
          </div>
          <button type="submit"  onClick={props.children.verify} id="loginbtn">Login</button>
          <div id="err"></div>
        </div>
        
        <div id="create" className="create"> 
          <p><Link to="signup">New User? Sign up here.</Link></p>
        </div>
        <div id="createsuccess"></div>
        </div>
      </div>  
    );
  }

export default Login;