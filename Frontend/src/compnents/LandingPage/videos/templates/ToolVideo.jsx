import React from "react";
import { allToolsVideosObj } from "../allToolsVideos";

export default function ToolVideo(props) {
  return (
    <iframe
      width="560"
      height="315"
      src={allToolsVideosObj.addingToBoardCollabForTrelloVid}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );
}
