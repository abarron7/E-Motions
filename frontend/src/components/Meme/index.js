import React from "react";
import "./style.css";
import { ListItem } from "../List";

const Meme = ({
  imageURL
}) => {
  

  return (
    <ListItem>
      <div className="media-snippet">
        <img className="image is-128xauto" src={imageURL} alt="meme" />
      </div>
    </ListItem>
  );
};

export default Meme;
