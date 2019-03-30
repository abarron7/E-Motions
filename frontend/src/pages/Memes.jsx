// Contains the React JSX New Memes page
// Contains the functions and components/elements required for this page

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

import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';

// Import components
import { List } from "../components/List/index";
import Meme from "../components/Meme/index";

import API from "../utils/API";

import "./Memes.css"

var $ = require('jquery');
export default withAuth(class Memes extends Component {
  constructor(props) {
    super(props);
    // this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);

    // testing routes START
    this.state = {
      authenticated: null,
      userinfo: null,
      scrapedMemes: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // testing routes END
  }

  // testing routes START
  handleSubmit(event) {
    event.preventDefault();
  }
  // testing routes END

  async componentDidMount() {
    this.checkAuthentication();
    console.log('giddy up');
    API.scrapeMemes()
      .then(res => {
        this.setState({
          scrapedMemes: res.data,
        });
        console.log("res");
        console.log(res);
      }
      )
      .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  scrapeMemes = () => {
    console.log("this is not a function.  this is just a tribute");
  };

  render() {
    const resourceServerExamples = [
      {
        label: 'Node/Express Resource Server Example',
        url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
      },
      {
        label: 'Java/Spring MVC Resource Server Example',
        url: 'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
      },
    ];

    return (
      <div class="body-memesfeed">
        {this.state.authenticated !== null &&
          <div>
            {/* <Header as="h1">Custom Login Page with Sign In Widget</Header> */}
            {this.state.authenticated &&
              <div>
                {/* <button onClick={() => this.scrapeMemes()}>Click Me</button> */}
                {/* <p>Length is {this.state.scrapedMemes.length}</p> */}
                {this.state.scrapedMemes.length ? (
                  <List>
                    {this.state.scrapedMemes.map(meme => (
                      <React.Fragment>
                        <Meme
                          src={meme}
                        />
                        <div class="button-rate button-rate-up">YES</div>
                        <div class="button-rate button-rate-down">NO</div>
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <div className="mockup-content">
                    <h4 className="heading-title text-center">
                      <div></div>
                    </h4>
                  </div>
                )}
              </div>
            }
            {!this.state.authenticated &&
              <div>
                <p>If you&lsquo;re viewing this page then you have successfully started this React application.</p>
                <p>
                  <span>This example shows you how to use the </span>
                  <a href="https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react">Okta React Library</a>
                  <span> and the </span>
                  <a href="https://github.com/okta/okta-signin-widget">Okta Sign-In Widget</a>
                  <span> to add the </span>
                  <a href="https://developer.okta.com/authentication-guide/implementing-authentication/implicit">Implicit Flow</a>
                  <span> to your application. This combination is useful when you want to leverage the features of the Sign-In Widget, </span>
                  <span> and the authentication helper components from the <code>okta-react</code> module.</span>
                </p>
                <p>
                  Once you have logged in you will be redirected through your authorization server (the issuer defined in config) to create a session for Single-Sign-On (SSO).
                  After this you will be redirected back to the application with an ID token and access token.
                  The tokens will be stored in local storage for future use.
                </p>
                <Button id="login-button" primary onClick={this.login}>Login</Button>
              </div>
            }
        </div>
        }
      </div>
    );
  }
});
