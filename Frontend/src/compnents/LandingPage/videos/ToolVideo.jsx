import React from "react";

export default function ToolVideo(props) {
  return (
    <div className="iframe-container">
      <iframe
        width="560"
        height="315"
        src={props.videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
