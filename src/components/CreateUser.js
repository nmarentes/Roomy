import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import { Link } from 'react-router';


const CreateUser = (props) => {
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
          <h3>Sign Up </h3>
          <div id="forms">
              <div><label>Username</label><input id="username" onChange={props.children.username} className="username" /></div>
              <div><label>Password</label><input type="password" id="password" onChange={props.children.password} className="password" /></div>
            </div>
            <div id="err"></div>
            <button id="submit" onClick={props.children.submit}>Submit</button>
            <Link to="login" id="already">Already a member?</Link>
          </div>
        </div>
      </div>      
    )
  }

export default CreateUser;