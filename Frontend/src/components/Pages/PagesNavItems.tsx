import React from "react";
import Link from "next/link";
import pagesLinkObj from "../component-utils/pageLinks/pagesLinkObj";

export default function PagesNavItems() {
  return (
    <>
      <li>
        <ul className="inner-nav-item-container">
          <Link className="nav-list" href={pagesLinkObj.toolsLink}>
            <h3 className="tools">Tools</h3>
          </Link>

          <Link className="nav-list" href={pagesLinkObj.pricingLink}>
            <h3 className="pricing">Pricing</h3>
          </Link>

          <Link className="nav-list" href={pagesLinkObj.faqLink}>
            <h3 className="faq">FAQ</h3>
          </Link>

          <Link className="nav-list" href={pagesLinkObj.reviewsLink}>
            <h3 className="reviews">Reviews</h3>
          </Link>
        </ul>
      </li>

      <li>
        <ul className="inner-nav-item-container">
          <Link href={pagesLinkObj.signInPageLink}>
            <h3 id="loginLandingPage">Log In</h3>
          </Link>

          <Link href={pagesLinkObj.registerPageLink} className="sign-up-cont">
            <h4 className="sign-up">Start for free</h4>
          </Link>
        </ul>
      </li>
    </>
  );
}
