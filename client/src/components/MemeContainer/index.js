import React, { Component } from "react";
import "./style.css";
import MemeImg from "../MemeImg";
import MemeNav from "../MemeNav";


export default class MemeContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleMemeDislikeChain = () => {
    this.props.handleDislikeMeme();
  }

  handleMemeShareChain = (dataFromChild) => {
    // alert("This is the Share button");
    this.props.handleMemeShare();
  }
  
  handleMemeLikeChain = () => {
    this.props.handleLikeMeme();
  }

  // handleMemeDislike = async id => {
  //   const originalBooks = this.state.books;
  //   try {
  //     await API.deleteBook(id).then(res => this.getSavedBooks());
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
        
  //     this.setState({ books: originalBooks });
  //   }
  // };

  // handleMemeShare = async id => {
  //   const originalBooks = this.state.books;
  //   try {
  //     await API.deleteBook(id).then(res => this.getSavedBooks());
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
        
  //     this.setState({ books: originalBooks });
  //   }
  // };
  
  render() {
    return (
      <div>
        <MemeImg
          src={this.props.src}
          ></MemeImg>
        <MemeNav
          handleMemeDislike={this.handleMemeDislikeChain}
          handleMemeShare={this.handleMemeShareChain}
          handleMemeLike={this.handleMemeLikeChain}
          src={this.props.src}
        ></MemeNav>
      </div>
    );
  };
}
