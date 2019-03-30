// Contains the React JSX Home page
// Contains the functions and components/elements required for this page

import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
import API from "../utils/API";
var $ = require("jquery");

export default withAuth(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null, userinfo: null };
      this.checkAuthentication = checkAuthentication.bind(this);
      this.login = this.login.bind(this);
    }

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    async login() {
      this.props.auth.login("/");
    }

    render() {
      return (
        <div>
          {this.state.authenticated !== null && (
            <div>
              <Header as="h1">Implicit Flow w/ Okta Hosted Login Page</Header>
              {this.state.authenticated && (
                <div>
                  <p>Welcome back, {this.state.userinfo.name}!</p>
                  <p>
                    You have successfully authenticated against your Okta org,
                    and have been redirected back to this application. You now
                    have an ID token and access token in local storage. Visit
                    the <a href="/profile">My Profile</a> page to take a look
                    inside the ID token.
                  </p>
                </div>
              )}
              {!this.state.authenticated && (
                <div>
                  <Button id="login-button" primary onClick={this.login}>
                    Login
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
);
