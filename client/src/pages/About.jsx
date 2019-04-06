// Contains the React JSX Home page
// Contains the functions and components/elements required for this page

import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";


import logoGit from '../assets/images/contact-logo-github.png';
import logoLinkedIn from '../assets/images/contact-logo-linkedin.png';

import About from "../components/About/index";

// import API from "../utils/API";

// Import page specific CSS
import "./CommonCSS.css";
import "./About.css";

export default withAuth(
  class About extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: null,
        userinfo: null,
        team:
          [
            {
              member: "Alejandro Barron",
              linkGit: "https://github.com/abarron7",
              linkLinkedIn: "https://www.linkedin.com/in/alejandro-barron-40206b169/",
              contribution: [
                "OKTA secure login and user authentication",
                "Project design, direction and styling",
                "Audio design"
              ]
            },
            {
              member: "David Ellis",
              linkGit: "https://github.com/dgellisco",
              linkLinkedIn: "https://www.linkedin.com/in/dgellisco/",
              contribution: [
                "Site framework",
                "Meme scraping and database storage",
                "Styling"
              ]
            },
            {
              member: "Daniel Gomez Calderon",
              linkGit: "https://github.com/gomezcalderondaniel",
              linkLinkedIn: "https://www.linkedin.com",
              contribution: [
                "Project presentation"
              ]
            }
          ]
       };
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
        <div className="page-body">
          {this.state.authenticated !== null && (
            <div>
              {/* <Header as="h1">About</Header> */}
              {this.state.authenticated && (
                <div className="page-text">
                  <Header as="h1">The Project</Header>
                  <ul>From a coding perspective, this site uses:
                      <li>
                        MERN stack: This site utilizes the MERN stack (MongoDB, Express, React, Node.js) to build
                        an incredibly fast and responsive website.
                      </li>
                      <li>
                        User Authentication: The use of remote authentication through the app
                        'OKTA' allows for persistent data and an extra layer of
                        security.
                      </li>
                      <li>
                        Persistent Data: MongoDB provides persistent data.
                      </li>
                      <li>
                        Webscraping: A scraper module trawls several websites 
                        and chains the get requests together into a
                        single promise, which is then sorted through to extract
                        memes from each individual site. What's cool here is
                        that each site is designed differently, but each is
                        extracted with minimal code written.
                      </li>
                  </ul>
                  <br></br>

                  <Header as="h1">The Team</Header>
                  <strong>
                    Alejandro Barron
                  </strong>
                  <div className="about-member-links-div">
                    <a href="https://github.com/abarron7" target="_blank" className="about-gitgithub-link"><img src={logoGit} className="logo-image"></img></a>
                    <a href="https://www.linkedin.com/in/alejandro-barron-40206b169/" target="_blank" className="about-gitlinkedin-link"><img src={logoLinkedIn} className="logo-image"></img></a>
                  </div>
                  <ul>
                      <li>
                        OKTA secure login and user authentication
                      </li>
                      <li>
                        Project design, direction and styling
                      </li>
                      <li>
                        Audio design
                      </li>
                  </ul>
                  <br></br>
                  <strong>
                    David Ellis
                  </strong>
                  <a href="https://github.com/dgellisco" target="_blank" className="about-gitgithub-link"><img src={logoGit} className="logo-image"></img></a>
                  <a href="https://www.linkedin.com/in/dgellisco/" target="_blank" className="about-gitlinkedin-link"><img src={logoLinkedIn} className="logo-image"></img></a>
                  <ul>
                      <li>
                        Site framework
                      </li>
                      <li>
                        Meme scraping and database storage
                      </li>
                      <li>
                        Styling
                      </li>
                  </ul>
                  <br></br>
                  <strong>
                    Daniel Gomez
                  </strong>
                  <a href="https://github.com/gomezcalderondaniel" target="_blank" className="about-gitgithub-link"><img src={logoGit} className="logo-image"></img></a>
                  <a href="https://www.linkedin.com/" target="_blank" className="about-gitlinkedin-link"><img src={logoLinkedIn} className="logo-image"></img></a>
                  <ul>
                      <li>
                        Project presentation
                      </li>
                  </ul>
                  <br></br>
                  
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
