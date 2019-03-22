import React, { Component } from 'react';
import './App.css';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import Data from './components/pages/Data'

const config = {
  issuer: 'https://Student-dev-817020.okta.com/oauth2/default',
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
          <Route path='/data' exact={true} component={Data}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
        </Security>
      </Router>
    );
  }
}

export default App;
