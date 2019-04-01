import React, { Component } from "react";
import "./style.css";
import memeNavShare from "../../assets/images/meme-nav-share.png";
import memeNavThumbsDown from "../../assets/images/meme-nav-thumbs-down.png";
import memeNavThumbsUp from "../../assets/images/meme-nav-thumbs-up.png";

class MemeNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="memeNavContainer">
          <img
            className="memeNavBtns"
            src={memeNavThumbsDown}
            onClick={() => this.props.handleMemeDislike()}
            // onClick={() => this.props.handleMemeDislike(memeInfo)}
          />

          <img
            className="memeNavBtns"
            src={memeNavShare}
            onClick={() => this.props.handleMemeShare()}
            // onClick={() => this.props.handleMemeShare(memeInfo)}
          />

          <img
            className="memeNavBtns"
            src={memeNavThumbsUp}
            onClick={() => this.props.handleMemeLike()}
            // onClick={() => this.props.handleMemeLike(memeInfo)}
          />
        </div>
      </>
    );
  }
}

export default MemeNav;
