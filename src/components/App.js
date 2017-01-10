import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CreateUser from './CreateUser';
import Dashboard from './Dashboard';
import axios from 'axios';
import { browserHistory } from 'react-router';

class App extends Component {
	constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      rooms: [],
      loggedIn: false
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  usernameChange(event) {
		this.setState({username: event.target.value})
    console.log(this.state);
  }

  passwordChange(event) {
		this.setState({password: event.target.value})
    console.log(this.state);
  }

  submitUser() {
    axios.post('/user/create/', {
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      browserHistory.push('/dashboard');
    })
  }

  verifyUser() {
    console.log(this.state);
    axios.post('/user/validate', {
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      browserHistory.push('dashboard');
    })
  }

  componentDidMount() {
    axios.get('/rooms')
    .then((response) => {
      this.setState({rooms: response.data});
    })
  }

	render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props, {
          appState: this.state,
          username: this.usernameChange,
          password: this.passwordChange,
          submit: this.submitUser,
          verify: this.verifyUser,
          rooms: this.state.rooms,
          user: this.state.username
        })}
      </div>
    )
	}
}

export default App;