// import ToolVideo from "../videos/ToolVideo";
import PropTypes from "prop-types";

export default function ToolBlueprint(props) {
  return (
    <section className="each-tool-section">
      <h2>
        <span>{props.indexNo + 1}.</span> {props.toolDetails.heading}
      </h2>

      <article>
        <p>{props.toolDetails.overview}</p>
      </article>

      <article style={{ width: "100%" }}>
        {/* {props.toolDetails.classicWayVideoUrl && (
          <ToolVideo videoUrl={props.toolDetails.classicWayVideoUrl} />
        )} */}
      </article>
    </section>
  );
}

ToolBlueprint.propTypes = {
  indexNo: PropTypes.number.isRequired, // Validate pageLink as a required string
  toolDetails: PropTypes.any, // Validate noCredits as a boolea
};
