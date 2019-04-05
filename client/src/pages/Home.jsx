// Contains the React JSX Home page
// Contains the functions and components/elements required for this page

import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
// import API from "../utils/API";

// Import page specific CSS
import "./CommonCSS.css";
import "./Home.css";
import soundFile from '../assets/audio/Happy.mp3';
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
        <div className={`${this.state.authenticated ? "page-body" : ""}`}>
          {this.state.authenticated !== null && (
            <div>
              {/* <article>
              	<audio class="audio" controls="controls">
		            <source type="audio/mpeg" src={soundFile}/>
	              </audio>
              </article> */}
          
              <Header as="h1">E-Motions: A Wholesome Memes Project</Header>
              {this.state.authenticated && (
                <div className="page-text">
                  <p>Welcome back, {this.state.userinfo.name}!</p>
                  <p>
                    This site is here to help you relax. It's a Wholesome Meme
                    site that scrapes from all over the internets, and brings
                    you the very best in wholesome goodness! Simply click on
                    "New Memes" in the search bar and start enjoying your new
                    favourite memes.
                  </p>
                  <audio
                  type="audio/mpeg"
                  src={soundFile}
                  autoPlay
                  controls
                  controlsList="nodownload"
                  preload="auto"
                  />
                </div>
              
              
              )}
              {!this.state.authenticated && (
                <div className="login-button">
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
);
