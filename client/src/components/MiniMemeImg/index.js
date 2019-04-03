import React, { Component } from "react";
import "./style.css";

class MiniMemeImg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <div className="miniMemeContainer"> */}
          <img
            className="miniMemeImage"
            src={this.props.src}
            alt="meme"
            onClick={() => alert("you clicked me")}
            // onClick={() => this.props.handleOpenMeme()}
          />
        {/* </div> */}
      </>
    );
  }
};

export default MiniMemeImg;
