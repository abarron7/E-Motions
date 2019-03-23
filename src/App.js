import React, { Component } from 'react';
import './App.css';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import Data from './components/pages/Profile'

const config = {
  issuer: 'https://dev-817020.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oadjrwyhSqaqWDTz356'
};

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
        >
          <Route path='/' exact={true} component={Home}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
          <Route path='/data' exact={true} component={Data}/>
        </Security>
      </Router>
    );
  }
}

export default App;
