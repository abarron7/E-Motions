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
import MiniMemeImg from "../components/MiniMemeImg/index";
// import MemeNav from "../components/MemeNav/index";

// Import scrape and DB API methods to trigger proxy routes
import API from "../utils/API";

// Import page specific CSS
import "./Saved.css";
// audio player
import soundFile from "./wow.mp3";
// var $ = require('jquery');


export default withAuth(class Saved extends Component {
  constructor(props) {
    super(props);
    // this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);

    // testing routes START
    this.state = {
      // user login state
      authenticated: null,
      userinfo: null,
      ready: false,
      // local meme storage from db
      allMemesFromDB: [],
      currentMeme: {
        index: null,
        url: null,
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  async componentDidMount() {
    await this.checkAuthentication();
    // Scrape memes
    if (!this.state.haveScraped) {
      this.scrapeMemes();
    }
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  // call scrape meme, which will populate user db with all new memes
  scrapeMemes = () => {
    // scrape meme api call
    API.scrapeMemes(this.state.userinfo.sub)
    .then(res => {
      // return all user's memes from db
      API.getAllSavedMemes({
        userID: this.state.userinfo.sub,
        review: 'New'
      })
      .then(res => {
        this.setState({
          allMemesFromDB: res.data,
          haveScraped: true
        });
        console.log(this.state.allMemesFromDB);
      })
      .then(() => {
        // this.getCurrentMeme();
      })
    })
    .catch(err => {
      console.log(err);
    });
  };

  returnLikedMemes = () => {
    // Find all new memes
    var savedMemesURLs = [];
    this.state.allMemesFromDB.forEach(function(result) {
      if (result.review == "Liked") {
        savedMemesURLs.push(result);
      } else if (result.review == "Disliked") {
        // console.log("This is disliked")
      } else {
        // console.log("is new");
      }
    });
    return savedMemesURLs;
  }

  handleOpenMeme = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // create array holding all memes of not-'new' type
    var allMemesFromDB = this.state.allMemesFromDB
    var savedMemes = [];
    allMemesFromDB.forEach(function(result) {
      if (result.review != "New") {
        savedMemes.push(result);
        console.log("getCurrentMeme02");
        console.log(savedMemes);
      }
    });
    
    console.log("getCurrentMeme03");
    // choose random meme of 'new' type
    savedMemes.map((selectedMeme, index) => {
        this.setState({
          currentMeme: {
            index: index,
            url: selectedMeme.imageURL
          }
        })
        return;
      })
  };

  // saves the meme with the userID
  handleLikeMeme = () => {
    // user id
    let id = this.state.userinfo.sub;
    // update the database
    API.saveMeme({
      userID: id,
      imageURL: this.state.currentMeme.url,
      review: "Liked"
    })
    .then(res => {
        // store state as scoped variables
        var allMemesFromDB = this.state.allMemesFromDB
        var currentMemeURL = this.state.currentMeme.url;
        // update the review status of the selected meme
        allMemesFromDB.forEach((result, index) => {
          if (result.imageURL == currentMemeURL) {
            allMemesFromDB[index].review = "Liked"
            // update the entire state with the one updated meme review
            this.setState({
              allMemesFromDB: allMemesFromDB
            })
          }
        })
    })
    .then(() => {
      // get next meme
      // this.getCurrentMeme();
    })
    .catch(err => console.log(err));
  }

  handleDislikeMeme = () => {
    // user id
    let id = this.state.userinfo.sub;
    // update the database
    API.saveMeme({
      userID: id,
      imageURL: this.state.currentMeme.url,
      review: "Disliked"
    })
    .then(res => {
        // store state as scoped variables
        var allMemesFromDB = this.state.allMemesFromDB
        var currentMemeURL = this.state.currentMeme.url;
        // update the review status of the selected meme
        allMemesFromDB.forEach((result, index) => {
          if (result.imageURL == currentMemeURL) {
            allMemesFromDB[index].review = "Disliked"
            // update the entire state with the one updated meme review
            this.setState({
              allMemesFromDB: allMemesFromDB
            })
          }
        })
    })
    .then(() => {
      // get next meme
      // this.getCurrentMeme();
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
                <audio src={soundFile} autoPlay />
                {/* <button onClick={() => this.scrapeMemes()}>Click Me</button> */}
                {/* <p>Length is {this.state.allMemesFromDB.length}</p> */}
                {/* <p>Current meme is {this.state.currentMeme.index}</p> */}
                
                  {/* Function, try to not call it here */}
                  
                  {this.state.currentMeme.url != null &&
                    <MemeContainer
                      src={this.state.currentMeme.url}
                      handleDislikeMeme={this.handleDislikeMeme}
                      handleLikeMeme={this.handleLikeMeme}
                    >
                    </MemeContainer>
                  }
                  {this.state.currentMeme.url == null &&
                    <React.Fragment>
                      <div className="container-saved">
                      {this.state.allMemesFromDB.map((meme, index) => {
                        {if (meme.review == 'Liked')
                          return <MiniMemeImg
                            src={this.state.allMemesFromDB[index].imageURL}
                          >
                          </MiniMemeImg>
                        return
                        }
                      })}
                      </div>
                    </React.Fragment>
                  }

                  <p>Current meme is {this.state.currentMeme.index}</p>
                

                <p>The array is currently {this.returnLikedMemes().length} memes long</p>
                
                {/* {this.state.allMemesFromDB.length ? (
                  <List>
                    {this.state.allMemesFromDB.map(meme => (
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


    // // Get a new meme
    // this.state.allMemesFromDB.forEach(function(result) {
    //   if (result.review == "New") {
    //     console.log("This is liked");
    //   } else if (result.review == "Disliked") {
    //     console.log("This is disliked")
    //   } else {
    //     console.log("is new");
    //   }
    // });