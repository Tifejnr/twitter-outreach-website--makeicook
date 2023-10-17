import React, { useState } from "react";
import ToolVideo from "../videos/ToolVideo";
import ToolListings from "./ToolListings";
import toggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg";

export default function ToolBlueprint(props) {
  const { drawBacksList } = props.toolDetails;
  const { benefitsList } = props.toolDetails;
  const [isClickedClassic, setIsClickedClassic] = useState(false);
  //CFT means collab for Trello own related actions
  const [isClickedCFT, setIsClickedCFT] = useState(false);

  const handleToggle = () => {
    setIsClickedClassic((prevState) => !prevState);
  };
  const handleToggleCFT = () => {
    setIsClickedCFT((prevState) => !prevState);
  };

  const rotateOnToggle = {
    transform: isClickedClassic && "rotate(180deg)",
  };
  const rotateOnToggleCFT = {
    transform: isClickedCFT && "rotate(180deg)",
  };

  const openFaqDetailsStyle = {
    maxHeight: isClickedClassic && "100%",
    marginTop: isClickedClassic && "1.2rem",
    overflow: isClickedClassic && "visible",
  };

  const openFaqDetailsStyleCFT = {
    maxHeight: isClickedCFT && "100%",
    marginTop: isClickedCFT && "1.2rem",
    overflow: isClickedCFT && "visible",
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
          onClick={handleToggleCFT}
          title="Click to know why"
        >
          Why use Collab for Trello way over the classic method?
          <div className="faq-item__arrow-container">
            <img
              style={rotateOnToggleCFT}
              src={toggleIcon}
              alt="faq toggle icon"
              className="faq-item__arrow-icon"
            />
          </div>
        </h4>
        <ul
          className="faq-item__detail toolLists"
          style={openFaqDetailsStyleCFT}
        >
          {benefitsList &&
            benefitsList.map((list, index) => (
              <ToolListings key={index} list={list} indexNo={index} />
            ))}
        </ul>
      </article>
    </section>
  );
}
