import React from 'react';


export default class CreateUser extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
      if(e.key === 'Enter') {
        this.props.submitCreateUser();
      }
    }
    
  render() {
    return (
    <div className="wrapper">
        <div className="container">
          <header><h1>Get a Room</h1></header>
        </div>
      <div id="container" className="app-container">
      <div id="herobox"></div>
        <div id="hero">
          <h2>Disrupt Room Scheduling.</h2>
          <p>Tired of not getting a room when you want a room?<br />Let <span>Get a Room</span> get you a room when you want a room.</p>
        </div>
        <div id="adminfield" className="admin-field">
          <h3>Sign Up </h3>
          <div id="forms">
              <div><label>Username</label><input id="username" ref="username" onChange={this.props.createdUsername} onKeyPress={this.handleKeyPress} className="username"></input></div>
              <div><label>Password</label><input type="password" id="password" ref="password" onChange={this.props.createdPassword} onKeyPress={this.handleKeyPress} className="password"></input></div>
              <div><label>Github Handle</label><input id="githubhandle" ref="githubhandle" onChange={this.props.createdGithub} onKeyPress={this.handleKeyPress} className="githubhandle"></input></div>
            </div>
            <div id="err">{this.props.createErr}</div>
            <button id="submit" onClick={this.props.submitCreateUser}>Submit</button>
            <a href="#" id="already" onClick={this.props.reset}>Already a member?</a>
          </div>
        </div>
      </div>
    );
  }
}