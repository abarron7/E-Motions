
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';

import API from "../utils/API";

// Import components
import { List } from "../components/List/index";
import Meme from "../components/Meme/index";

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
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }
  // testing routes END

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  scrapeMemes = () => {
    API.scrapeMemes()
      .then(res =>
        this.setState({
          scrapedMemes: res.data
        })
      )
      .catch(err => console.log(err));
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
      <div>
        {this.state.authenticated !== null &&
          <div>
            <Header as="h1">Custom Login Page with Sign In Widget</Header>
            {this.state.authenticated &&
              <div>
                <p>Welcome back, {this.state.userinfo.name}!</p>
                <p>MEMES WILL GO HERE</p>
                <button onClick={() => this.scrapeMemes()}>Click Me</button>
                {this.state.scrapedMemes.length ? (
                  <List>
                    {this.state.scrapedMemes.map(meme => (
                      <Meme
                        key={meme.id}
                        url={meme.url}
                      />
                    ))}
                  </List>
                ) : (
                  <div className="mockup-content">
                    <h4 className="heading-title text-center">
                      <div>whoops!</div>
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
