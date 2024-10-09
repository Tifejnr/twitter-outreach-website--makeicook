import PropTypes from "prop-types"; // Import PropTypes
import GetStartedIcon from "../../LandingPage/Body/GetStartedIcon";

CTAForTermsPolicy.propTypes = {
  title: PropTypes.string.isRequired, // Validate pageLink as a required string
};

export default function CTAForTermsPolicy(props) {
  return (
    <section className="about-us-CTA-section cta-for-seo-section">
      <h1>{props.title}</h1>

      <GetStartedIcon />
    </section>
  );
}
