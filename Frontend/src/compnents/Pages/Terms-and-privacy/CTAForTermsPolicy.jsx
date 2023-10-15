import { Link } from "react-router-dom";
import handlePageRefreshOnLoad from "../../utilis/refreshPageOnLoad";
const registerLink = "/authorize";

export default function CTAForTermsPolicy(props) {
  return (
    <section className="about-us-CTA-section">
      <h1>{props.title}</h1>
      <section className="call-to-action-cont">
        <Link
          to={registerLink}
          className="oauth-button"
          onClick={(e) => {
            e.preventDefault();
            handlePageRefreshOnLoad(registerLink);
          }}
        >
          <h2>Start for free</h2>
        </Link>
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
