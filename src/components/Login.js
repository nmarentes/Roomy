import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleOnLogin = this.handleOnLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleOnKey(target) {
      console.log('key pressed')
      console.log(target)
      if(target.charCode==13){
            alert('Enter clicked!!!');    
      }

    }
    handleOnLogin() {
        this.refs.username.value = '';
        this.refs.password.value = '';
        this.props.login();
    }
    handleKeyPress(e){
      if(e.key === 'Enter') {
        this.handleOnLogin();
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
          <h3>Log in </h3>
          <div id="forms" className="forms">
            <div><label>Username:</label> <input id="username" ref="username" onKeyPress={this.handleKeyPress} onChange={this.props.username} className="username"></input></div>
            <div><label>Password:</label> <input type="password" id="password" onKeyPress={this.handleKeyPress} ref="password" onChange={this.props.password} className="password"></input></div> 
          </div>
          <button type="submit" onClick={this.handleOnLogin} id="loginbtn">Login</button>
          <div id="err">{this.props.loginErr}</div>
        </div>
        
        <div id="create" className="create"> 
          <p><a href="#" onClick={this.props.createUser}>New User? Sign up here.</a></p>
        </div>
        <div id="createsuccess">{this.props.createSuccess}</div>
        </div>
      </div>  
    );
  }
}