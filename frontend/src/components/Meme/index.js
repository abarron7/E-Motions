import React from "react";
import "./style.css";
import { ListItem } from "../List";

const Meme = ({
  src
}) => {
  

  return (
    <ListItem>
      <div className="media-snippet">
        <img className="imageMeme" src={src} alt="meme" />
      </div>
    </ListItem>
  );
};

export default Meme;
