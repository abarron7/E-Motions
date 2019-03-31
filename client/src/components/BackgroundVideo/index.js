import React, { Component } from 'react';
import "./style.css";
import video from '../../assets/video/index.js';

export default class BackgroundVideo extends Component {
  
  render() {
    return (
      <div>
        <div id="bg-video-container">
            <video autoPlay muted loop id="bg-video">
                <source src={video} type="video/mp4"></source>
            </video>
        </div>
      </div>
    );
  }
}

