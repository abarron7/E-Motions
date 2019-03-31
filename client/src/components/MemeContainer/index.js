import React, { Component } from "react";
import "./style.css";
import MemeImg from "../MemeImg";
import MemeNav from "../MemeNav";


export default class MemeContainer extends Component {
  constructor(props) {
    super(props);

    this.handleMemeDislike = this.handleMemeDislike.bind(this);
  }

  handleMemeDislike(dataFromChild) {
    alert("This is the Dislike button");
  }

  handleMemeShare(dataFromChild) {
    alert("This is the Share button");
  }
  
  handleMemeLike() {
    this.props.handleSaveMeme();
  }

  // handleMemeLike = async id => {
  //   const originalBooks = this.state.books;
  //   try {
  //     await API.deleteBook(id).then(res => this.getSavedBooks());
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
        
  //     this.setState({ books: originalBooks });
  //   }
  // };

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
          handleMemeDislike={this.handleMemeDislike}
          handleMemeShare={this.handleMemeShare}
          handleMemeLike={this.handleMemeLike}
        ></MemeNav>
      </div>
    );
  };
}
