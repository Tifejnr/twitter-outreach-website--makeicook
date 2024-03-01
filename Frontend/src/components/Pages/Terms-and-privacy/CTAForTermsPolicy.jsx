import Link from "next/link";
import allLinks from "../../auth/utils/links/allLinks";

export default function CTAForTermsPolicy(props: { title: string }) {
  return (
    <section className="about-us-CTA-section">
      <h1>{props.title}</h1>
      <section className="call-to-action-cont">
        <Link href={allLinks.signUpPage} className="oauth-button">
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
