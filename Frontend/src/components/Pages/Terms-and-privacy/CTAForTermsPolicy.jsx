import allLinks from "../../auth/utils/links/allLinks";
import PropTypes from "prop-types"; // Import PropTypes

CTAForTermsPolicy.propTypes = {
  title: PropTypes.string.isRequired, // Validate pageLink as a required string
};

export default function CTAForTermsPolicy(props) {
  return (
    <section className="about-us-CTA-section">
      <h1>{props.title}</h1>
      <section className="call-to-action-cont">
        <a href={allLinks.signUpPage} className="oauth-button">
          <h2>Start for free</h2>
        </a>
        <ul>
          <li>
            <p>5 free credits for trial</p>
          </li>
          <li>
            <p>No credit card required</p>
          </li>
        </ul>
      </section>
    </section>
  );
}
