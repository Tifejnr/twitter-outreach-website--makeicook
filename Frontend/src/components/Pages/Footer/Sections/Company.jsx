import pagesLinkObj from "../../../component-utils/pageLinks/pagesLinkObj";

export default function Company() {
  return (
    <section>
      <h3>Company</h3>
      <ul>
        <a href={pagesLinkObj.aboutPageLink}>
          <p>About us</p>
        </a>

        <a href={pagesLinkObj.contactPageLink}>
          <p>Contact us</p>
        </a>

        <a href={pagesLinkObj.mediaPageLink}>
          <p>Media</p>
        </a>

        <a href={pagesLinkObj.termsPageLink}>
          <p>Terms</p>
        </a>

        <a href={pagesLinkObj.privacyPolicyPageLink}>
          <p>Privacy Policy</p>
        </a>
      </ul>
    </section>
  );
}
