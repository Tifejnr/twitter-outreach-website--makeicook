import React from "react";
import ToolVideo from "../videos/ToolVideo";
import ToolListings from "./ToolListings";

export default function ToolBlueprint(props) {
  const { drawBacksList } = props.toolDetails;
  const { benefitsList } = props.toolDetails;

  return (
    <section className="each-tool-section">
      <h2>
        <span>{props.indexNo + 1}.</span> {props.toolDetails.heading}
      </h2>

      <article>
        <p>{props.toolDetails.overview}</p>
      </article>

      <article>
        <h3>Classic way of doing it in Trello </h3>
        {props.toolDetails.classicWayVideoUrl && (
          <ToolVideo videoUrl={props.toolDetails.classicWayVideoUrl} />
        )}
        <ul>
          <h4>Drawbacks</h4>
          {drawBacksList &&
            drawBacksList.map((list, index) => (
              <ToolListings key={index} list={list} indexNo={index} />
            ))}
        </ul>
      </article>

      <article>
        <h3>Collab for Trello way of doing it</h3>
        {props.toolDetails.collabForTrelloWayVideoUrl && (
          <ToolVideo videoUrl={props.toolDetails.collabForTrelloWayVideoUrl} />
        )}
        <ul>
          <h4>Benefits of choosing this</h4>
          {benefitsList &&
            benefitsList.map((list, index) => (
              <ToolListings key={index} list={list} indexNo={index} />
            ))}
        </ul>
      </article>
    </section>
  );
}
