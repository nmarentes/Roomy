import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Dashboard from './components/Dashboard';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CreateUser} />
      <Route path="login" component={Login} />
      <Route path="signup" component={CreateUser} />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </Router>
), document.getElementById('app'));