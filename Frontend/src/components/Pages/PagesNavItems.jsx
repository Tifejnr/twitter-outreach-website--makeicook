import pagesLinkObj from "../component-utils/pageLinks/pagesLinkObj";

export default function PagesNavItems() {
  return (
    <>
      <li>
        <ul className="inner-nav-item-container">
          <a className="nav-list" href={pagesLinkObj.toolsLink}>
            <h3 className="tools">Tools</h3>
          </a>

          <a className="nav-list" href={pagesLinkObj.pricingLink}>
            <h3 className="pricing">Pricing</h3>
          </a>

          <a className="nav-list" href={pagesLinkObj.faqLink}>
            <h3 className="faq">FAQ</h3>
          </a>

          <a className="nav-list" href={pagesLinkObj.reviewsLink}>
            <h3 className="reviews">Reviews</h3>
          </a>
        </ul>
      </li>

      <li>
        <ul className="inner-nav-item-container">
          <a href={pagesLinkObj.signInPageLink}>
            <h3 id="loginLandingPage">Log In</h3>
          </a>

          <a href={pagesLinkObj.registerPageLink} className="sign-up-cont">
            <h4 className="sign-up">Start for free</h4>
          </a>
        </ul>
      </li>
    </>
  );
}
