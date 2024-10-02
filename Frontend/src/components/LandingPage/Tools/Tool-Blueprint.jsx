import { useState } from "react";
import ToolVideo from "../videos/ToolVideo";
import PropTypes from "prop-types";

export default function ToolBlueprint(props) {
  // State to track video visibility
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Function to toggle video visibility
  const toggleVideoVisibility = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  // Split the overview text into paragraphs
  // const paragraphs = props.toolDetails.overview.trim().split("\n\n");
  return (
    <section className="each-tool-section">
      <h2>
        <span>{props.indexNo + 1}.</span> {props.toolDetails.heading}
      </h2>

      {/* <article>
        <div>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article> */}

      <button onClick={toggleVideoVisibility} className="view-demo-btn">
        {!isVideoVisible ? "See how it works" : "Close"}
      </button>
      {isVideoVisible && (
        <article
          style={{ width: "100%" }}
          className={
            isVideoVisible ? "tool-video-visible" : "tool-video-hidden"
          }
        >
          {props.toolDetails.classicWayVideoUrl && (
            <ToolVideo videoUrl={props.toolDetails.classicWayVideoUrl} />
          )}
        </article>
      )}
    </section>
  );
}

ToolBlueprint.propTypes = {
  indexNo: PropTypes.number.isRequired, // Validate pageLink as a required string
  toolDetails: PropTypes.any, // Validate noCredits as a boolea
};
