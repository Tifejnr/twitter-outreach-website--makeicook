import PropTypes from "prop-types";
import TutorialsVideoBp from "./TutorialsVideoBp";

export default function TutorialsBlueprint(props) {
  const { tutorialObj, indexNo } = props;
  return (
    <section className="each-tool-section">
      <h2>
        <span>
          <b>{indexNo + 1}. </b>
        </span>
        {tutorialObj.heading}
      </h2>

      <article style={{ width: "100%" }}>
        <TutorialsVideoBp videoUrl={tutorialObj.videoUrl} />
      </article>
    </section>
  );
}

TutorialsBlueprint.propTypes = {
  indexNo: PropTypes.number.isRequired, // Validate pageLink as a required string
  tutorialObj: PropTypes.any.isRequired, // Validate noCredits as a boolea
};
