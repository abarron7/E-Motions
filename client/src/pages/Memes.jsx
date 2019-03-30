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

// Okta
import { withAuth } from '@okta/okta-react';
// React
import React, { Component } from 'react';
// Semantic UI
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';
// Import reusable components utilized in this page
import { List } from "../components/List/index";
import Meme from "../components/Meme/index";
import MemeContainer from "../components/MemeContainer/index";
// Import API methods to trigger proxy routes
import API from "../utils/API";
// Import page specific CSS
import "./Memes.css"

// var $ = require('jquery');

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
      ready: false,
      scrapedMemes: [],
      currentMeme: {
        index: null,
        url: 'https://cdn1.iconfinder.com/data/icons/dinosaur/154/small-dino-dinosaur-dragon-walk-512.png'
      }
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
    await this.checkAuthentication();
    this.applyClaims();
    this.scrapeMemes();
    console.log(this.state.userinfo);
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
    this.applyClaims();    
  }

  async login() {
    this.props.auth.login('/');
  }

  async applyClaims() {
    if (this.state.userinfo && !this.state.claims) {
      const claims = Object.entries(this.state.userinfo);
      this.setState({ claims, ready: true });
    }
  }

  scrapeMemes = () => {
    API.scrapeMemes()
    .then(res => {
      this.setState({
        scrapedMemes: res.data,
      });
      // console.log("res");
      // console.log(res);
    })
    .catch(err => console.log(err));
  };

  getCurrentMeme = () => {
    var randomIndex = Math.floor(Math.random() * (this.state.scrapedMemes.length + 1));
    this.state.scrapedMemes.map((selectedMemeURL, index) => {
      if (index == randomIndex) {
        console.log("index " + randomIndex + " is for " + selectedMemeURL);
        this.state.scrapedMemes.splice(index, 1);
        this.setState({
          currentMeme: {
            index: index,
            url: selectedMemeURL
          }
        })
        return;
      }
    })
  };

  saveMeme = () => {
    API.saveMeme()
    .then(res => {
      this.setState({
        // scrapedMemes: res.data,
      });
      console.log("res");
      console.log(res);
    })
    .catch(err => console.log(err));
  }

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
      <div className="body-memesfeed">
        {this.state.authenticated !== null &&
          <div>
            {/* <Header as="h1">Custom Login Page with Sign In Widget</Header> */}
            {this.state.authenticated &&
              <div>
                {/* <button onClick={() => this.scrapeMemes()}>Click Me</button> */}
                {/* <p>Length is {this.state.scrapedMemes.length}</p> */}
                {/* <p>Current meme is {this.state.currentMeme.index}</p> */}
                
                
                  {this.getCurrentMeme()}
                  <img src={this.state.currentMeme.url}></img>
                  <p>Current meme is {this.state.currentMeme.index}</p>
                

                <p>The array is currently {this.state.scrapedMemes.length} memes long</p>
                
                {/* {this.state.scrapedMemes.length ? (
                  <List>
                    {this.state.scrapedMemes.map(meme => (
                      <React.Fragment>
                        <Meme
                          src={meme}
                        />
                        <div className="button-rate button-rate-up">YES</div>
                        <div className="button-rate button-rate-down">NO</div>
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <div className="mockup-content">
                    <h4 className="heading-title text-center">
                      <div></div>
                    </h4>
                  </div>
                )} */}

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
