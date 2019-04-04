import React, { Component } from "react";
import "./style.css";
import logoGit from '../../assets/images/contact-logo-github.png';
import logoLinkedIn from '../../assets/images/contact-logo-linkedin.png';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <strong>
          {this.props.member}
        </strong>
        <a href="https://github.com/abarron7" className="about-github-link">GitHub</a>
        <a href="https://www.linkedin.com/in/alejandro-barron-40206b169/" className="about-linkedin-link">LinkedIn</a>
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
      </>
    );
  }
};

export default About;
