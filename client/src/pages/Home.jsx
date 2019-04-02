// Contains the React JSX Home page
// Contains the functions and components/elements required for this page

import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
// import API from "../utils/API";

// Import page specific CSS
import "./Home.css"

// var $ = require("jquery");

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
              <Header as="h1">E-Motions: A Wholesome Memes Project</Header>
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
                  <p>
                    This site allows you to browse through many Wholesome Memes.
                    These memes were scraped from multiple sites, and are now ready
                    for you to enjoy!  Simply click on "New Memes" in the search bar
                    and start enjoying (and saving!) your favourite memes.
                  </p>
                  <p>
                    From a coding perspective, there are several things to point out 
                    about this project.
                    <ul>
                    <br></br>
                      <li>
                        It contains a webscraper that chains several get requests from totally
                        different websites into promises, and then sorts through each of them individually
                        to extract the meme urls and then provide the user with a large pool of memes to enjoy.
                      </li>
                      <br></br>
                      <li>
                        It utilises the MERN stack to build an incredibly fast and responsive 
                        website.  The use of remote authentication through the app 'OKTA' adds 
                        a layer of security, and is integrated with a Mongo database
                        to provide persistent data to store our favorite memes.
                      </li>
                    </ul>
                  </p>
                </div>
              )}
              {!this.state.authenticated && (
                <div className="login-button">
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
