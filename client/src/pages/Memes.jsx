// Contains the React JSX New Memes page
// Contains the functions and components/elements required for this page

// Okta
import { withAuth } from '@okta/okta-react';
// React
import React, { Component } from 'react';
// Semantic UI
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';

// Import reusable components utilized in this page
// import { List } from "../components/List/index";
import MemeContainer from "../components/MemeContainer/index";
// import MemeImg from "../components/MemeImg/index";
// import MemeNav from "../components/MemeNav/index";

// Import API methods to trigger proxy routes
import API from "../utils/API";
// Import page specific CSS
// import "./Memes.css";
// audio player
import ReactAudioPlayer from "react-audio-player";
import soundFile from "./wow.mp3";
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
        url: null,
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
    // this.applyClaims();
    this.scrapeMemes();
    console.log(this.state.userinfo);
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
    // this.applyClaims();    
  }

  async login() {
    this.props.auth.login('/');
  }

  // async applyClaims() {
  //   if (this.state.userinfo && !this.state.claims) {
  //     const claims = Object.entries(this.state.userinfo);
  //     this.setState({ claims, ready: true });
  //   }
  // }

  scrapeMemes = () => {
    API.scrapeMemes()
    .then(res => {
      this.setState({
        scrapedMemes: res.data,
      });
      // console.log("res");
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
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

  handleSaveMeme = () => {
    API.saveMeme({
      userID: "123545",
      imageURL: this.state.currentMeme.url,
      review: "Liked"
    })
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
    return (
      <div className="body-memesfeed">
        {this.state.authenticated !== null && (
          <div>
            {/* <Header as="h1">Custom Login Page with Sign In Widget</Header> */}
            {this.state.authenticated &&(
              <div>
                <ReactAudioPlayer src={soundFile} autoPlay />
                {/* <button onClick={() => this.scrapeMemes()}>Click Me</button> */}
                {/* <p>Length is {this.state.scrapedMemes.length}</p> */}
                {/* <p>Current meme is {this.state.currentMeme.index}</p> */}
                
                  {/* Function, try to not call it here */}
                  {this.getCurrentMeme()}

                  {this.state.currentMeme.url != null &&
                    <MemeContainer
                      src={this.state.currentMeme.url}
                      handleSaveMeme={this.handleSaveMeme}
                    >
                    </MemeContainer>
                  }

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
            )}
            {!this.state.authenticated && (
              <div>
                <Button id="login-button" primary onClick={this.login}>Login</Button>
              </div>
            )}
            </div>
        )}
      </div>
      );
    }
  }
);
