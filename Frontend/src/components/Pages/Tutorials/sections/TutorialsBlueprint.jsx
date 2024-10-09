import ToolVideo from "../../../LandingPage/videos/ToolVideo";
import PropTypes from "prop-types";

export default function TutorialsBlueprint(props) {
  const { tutorialObj } = props;
  return (
    <section className="each-tool-section">
      <h2>
        <span>
          <b>{props.indexNo + 1}. </b>
        </span>
        {tutorialObj.heading}
      </h2>

      <article style={{ width: "100%" }}>
        <ToolVideo videoUrl={tutorialObj.videoUrl} />
      </article>
    </section>
  );
}

TutorialsBlueprint.propTypes = {
  indexNo: PropTypes.number.isRequired, // Validate pageLink as a required string
  tutorialObj: PropTypes.any, // Validate noCredits as a boolea
};
