
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Icon } from "semantic-ui-react";
import "./Footer.css";

export default withAuth(class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <footer className="footer">
              
          </footer>
     </div>
    );
  }
});
