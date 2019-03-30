
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './.samples.config';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Memes from './pages/Memes';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (
      <Router>
       <Security
         issuer={config.oidc.issuer}
          client_id={config.oidc.clientId}
          redirect_uri={config.oidc.redirectUri}
        >
         <Navbar />
          <Container text style={{ marginTop: '7em' }}>
            <Route path="/" exact component={Home} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <SecureRoute path="/messages" component={Messages} />
            <SecureRoute path="/memes" component={Memes} />
            <SecureRoute path="/profile" component={Profile} />
          </Container>
        </Security>
      </Router>
    );
  }
}

export default App;
