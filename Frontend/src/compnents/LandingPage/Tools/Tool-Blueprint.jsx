import React, { useState } from "react";
import ToolVideo from "../videos/ToolVideo";
import ToolListings from "./ToolListings";
import toggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg";

export default function ToolBlueprint(props) {
  const { drawBacksList } = props.toolDetails;
  const { benefitsList } = props.toolDetails;
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked((prevState) => !prevState);
  };

  const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)",
  };

  const openFaqDetailsStyle = {
    maxHeight: isClicked && "100%",
    marginTop: isClicked && "1.2rem",
    overflow: isClicked && "visible",
  };

  return (
    <section className="each-tool-section">
      <h2>
        <span>{props.indexNo + 1}.</span> {props.toolDetails.heading}
      </h2>

      <article>
        <p>{props.toolDetails.overview}</p>
      </article>

      <article>
        <h3>Classic way of adding members to multiple Trello boards</h3>
        {props.toolDetails.classicWayVideoUrl && (
          <ToolVideo videoUrl={props.toolDetails.classicWayVideoUrl} />
        )}
        <h4
          className="faq-item__summary"
          onClick={handleToggle}
          title="Click to know why"
        >
          Why is the classic method above not the best way?
          <div className="faq-item__arrow-container">
            <img
              style={rotateOnToggle}
              src={toggleIcon}
              alt="faq toggle icon"
              className="faq-item__arrow-icon"
            />
          </div>
        </h4>

        <ul className="faq-item__detail toolLists" style={openFaqDetailsStyle}>
          {drawBacksList &&
            drawBacksList.map((list, index) => (
              <ToolListings key={index} list={list} indexNo={index} />
            ))}
        </ul>
      </article>

      <article>
        <h3>
          Collab for Trello way of adding members to multiple Trello boards
        </h3>

        {props.toolDetails.collabForTrelloWayVideoUrl && (
          <ToolVideo videoUrl={props.toolDetails.collabForTrelloWayVideoUrl} />
        )}
        <h4
          className="faq-item__summary"
          onClick={handleToggle}
          title="Click to know why"
        >
          Why use Collab for Trello way over the classic method?
          <div className="faq-item__arrow-container">
            <img
              style={rotateOnToggle}
              src={toggleIcon}
              alt="faq toggle icon"
              className="faq-item__arrow-icon"
            />
          </div>
        </h4>
        <ul className="faq-item__detail toolLists" style={openFaqDetailsStyle}>
          {benefitsList &&
            benefitsList.map((list, index) => (
              <ToolListings key={index} list={list} indexNo={index} />
            ))}
        </ul>
      </article>
    </section>
  );
}
