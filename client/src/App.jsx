// Contains the React Router
// Determines the React pages that will be rendered

/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './.samples.config';

import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Memes from './pages/Memes';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import About from './pages/About';

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
         <BackgroundVideo />
          <Container text style={{ marginTop: '7em', minHeight: 'calc(100vh - 25px)'}}>
            <Route path="/" exact component={Home} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <SecureRoute path="/memes" component={Memes} />
            {/* <SecureRoute path="/callback" component={Home} /> */}
            <SecureRoute path="/saved" component={Saved} />
            <SecureRoute path="/profile" component={Profile} />
            <SecureRoute path="/about" component={About} />
          </Container>
          {/* <Footer></Footer> */}
        </Security>
      </Router>
    );
  }
}

export default App;
