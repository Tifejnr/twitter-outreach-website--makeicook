import pagesLinkObj from "../../../component-utils/pageLinks/pagesLinkObj";

export default function Company() {
  return (
    <section>
      <h3>Company</h3>
      <ul>
        <a href={pagesLinkObj.aboutPageLink} target="_blank" rel="noreferrer">
          <p>About us</p>
        </a>

        <a href={pagesLinkObj.contactPageLink} target="_blank" rel="noreferrer">
          <p>Contact us</p>
        </a>

        <a href={pagesLinkObj.mediaPageLink} target="_blank" rel="noreferrer">
          <p>Media</p>
        </a>

        <a href={pagesLinkObj.termsPageLink} target="_blank" rel="noreferrer">
          <p>Terms</p>
        </a>

        <a
          href={pagesLinkObj.privacyPolicyPageLink}
          target="_blank"
          rel="noreferrer"
        >
          <p>Privacy Policy</p>
        </a>
      </ul>
    </section>
  );
}
