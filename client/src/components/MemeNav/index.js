import React, { Component } from "react";
import "./style.css";
import memeNavShare from '../../assets/images/meme-nav-share.png';
import memeNavThumbsDown from '../../assets/images/meme-nav-thumbs-down.png';
import memeNavThumbsUp from '../../assets/images/meme-nav-thumbs-up.png';

class MemeNav extends Component {
  constructor(props) {
    super(props);
  }
  

  handleOpenFBShare = () => {

      var newSrc = this.props.src;
      console.log(this.props.src);
      console.log(newSrc);
      newSrc = newSrc.replace("/", '%2F');
      newSrc = newSrc.replace(":", '%3A');
      var newFBSrc = 'https://www.facebook.com/sharer/sharer.php?u=' + newSrc + '&amp;src=sdkpreparse';
      window.open(
        newFBSrc,
        "Share An E-Motion Meme",
        "height=500,width=400"
        );

  }

  render() {
    return (
      <>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2&appId=825196851149988&autoLogAppEvents=1">
        </script>

        <div className="memeNavContainer">
          <img className="memeNavBtns" alt="meme" src={memeNavThumbsDown}
            onClick={() => this.props.handleMemeDislike()}
            // onClick={() => this.props.handleMemeDislike(memeInfo)}
          ></img>
          <img className="memeNavBtns" alt="meme" src={memeNavThumbsUp}
            onClick={() => this.props.handleMemeLike()}
            // onClick={() => this.props.handleMemeLike(memeInfo)}
          ></img>

          <div class="fb-share-button"
          data-href={this.props.src}
          data-layout="button" data-size="small" onClick={() => this.handleOpenFBShare()}>
              <img className="memeNavBtns" alt="meme" src={memeNavShare}
                // onClick={() => this.props.handleMemeShare()}
                // onClick={() => this.props.handleMemeShare(memeInfo)}
              ></img>
          </div>

        </div>
      </>
    );
  }
};

export default MemeNav;
