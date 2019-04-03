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
                    This site is here to help you relax.  It's a Wholesome Meme
                    site that scrapes from all over the internets, and brings you the
                    very best in wholesome goodness!  Simply click on "New Memes" in the search bar
                    and start enjoying your new favourite memes.
                  </p>
                  <div>
                    From a coding perspective, this site has the following:
                    <ul>
                      <br></br>
                      <li>
                        MERN stack: This site utilizes the MERN stack to build an incredibly fast and responsive 
                        website.
                      </li>
                      <br></br>
                      <li>
                        OKTA: The use of remote authentication through the app 'OKTA' allows for persistent 
                        data and an extra layer of security.
                      </li>
                      <br></br>
                      <li>
                        MongoDB: The site utilizes a Mongo database to provide the persistent data.
                      </li>
                      <br></br>
                      <li>
                        Webscraping: This site scrapes several different websites and chains the get requests together into
                        a single promise, which is then sorted to extract memes from each individual site.
                        What's cool here is that each site is designed differently, but each is extracted with 
                        minimal code written.
                      </li>
                      <br></br>
                      <li>
                        MVC - this follows the MVC build design and folder structure.
                      </li>
                    </ul>
                  </div>
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
