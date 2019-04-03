
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from '../helpers';
import { Icon } from "semantic-ui-react";

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    return (
      <div>
           {/* <Menu fixed="top" inverted>
            <Container>
              <Menu.Item as="a" header href="/">
                <Image size="mini" src="/react.svg" />
                &nbsp;
                E-Motions. An Okta-React, Feel-Good Project!
              </Menu.Item>
              {this.state.authenticated === true && <Menu.Item id="saved-button" as="a" href="/saved"><Icon name="mail outline" />Saved</Menu.Item>}
              {this.state.authenticated === true && <Menu.Item id="memes-button" as="a" href="/memes">New Memes</Menu.Item>}
              {this.state.authenticated === true && <Menu.Item id="profile-button" as="a" href="/profile">Profile</Menu.Item>}
              {this.state.authenticated === true && <Menu.Item id="logout-button" as="a" onClick={this.logout}>Logout</Menu.Item>}
              {this.state.authenticated === false && <Menu.Item as="a" onClick={this.login}>Login</Menu.Item>}
            </Container>
          </Menu>
       */}
       <nav> 
       <div id="logo" src="/react.svg"></div>
 
       <label for="drop" class="toggle">Menu</label>
       <input type="checkbox" id="drop" />
        <ul class="menu">
          <li>{this.state.authenticated === true && <a id="home-button" as="a" href="/">Home</a>}</li>  
          <li>{this.state.authenticated === true && <a id="saved-button" as="a" href="/saved">Saved</a>}</li>  
          <li>{this.state.authenticated === true && <a id="memes-button" as="a" href="/memes">New Memes</a>}</li>
          <li>{this.state.authenticated === true && <a id="profile-button" as="a" href="/profile">Profile</a>}</li>
          <li>{this.state.authenticated === true && <a id="logout-button" as="a" onClick={this.logout}>Logout</a>}</li>
          <li>{this.state.authenticated === false && <a id="login-button" as="a" onClick={this.login}>Login</a>}</li>
        </ul>
      </nav>
     </div>
    );
  }
});
