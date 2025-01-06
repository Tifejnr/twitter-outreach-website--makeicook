import pagesLinkObj from "../../../component-utils/pageLinks/pagesLinkObj";
// const reviewsPageLink= "/reviews"
// const pricingPageLink= "/pricing"

export default function ResourcesSection() {
  return (
    <>
      <section>
        <h3>Resources</h3>
        <ul>
          <a
            href={pagesLinkObj.tutorialsPageLink}
            target="_blank"
            rel="noreferrer"
          >
            <p>Tutorials</p>
          </a>

          <a href={pagesLinkObj.blogPageLink} target="_blank" rel="noreferrer">
            <p>Blog</p>
          </a>

          {/* <li>< Link   htmlFor={reviewsPageLink}><p>Reviews</p></ Link  ></li>
        <li>< Link   htmlFor={pricingPageLink}><p>Pricing</p></ Link  ></li>
        <li>< Link   htmlFor=""></ Link  ></li> */}
        </ul>
      </section>
    </>
  );
}
