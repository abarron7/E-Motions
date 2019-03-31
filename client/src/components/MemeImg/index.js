import React from "react";
import "./style.css";

const MemeImg = ({
  src
}) => {
  

  return (
    <>
      <div className="memeContainer">
        <img className="memeImage" src={src} alt="meme"/>
      </div>
    </>
  );
};

export default MemeImg;
