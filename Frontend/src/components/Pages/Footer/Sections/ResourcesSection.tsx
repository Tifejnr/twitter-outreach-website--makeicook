import React from "react";
import Link from "next/link";
import pagesLinkObj from "@/app/components/component-utils/pageLinks/pagesLinkObj";
// const reviewsPageLink= "/reviews"
// const pricingPageLink= "/pricing"

export default function ResourcesSection() {
  return (
    <>
      <section>
        <h3>Resources</h3>
        <ul>
          <Link href={pagesLinkObj.blogPageLink}>
            <p>Blog</p>
          </Link>

          <Link href={pagesLinkObj.tutorialsPageLink}>
            <p>Tutorials</p>
          </Link>

          {/* <li>< Link   htmlFor={reviewsPageLink}><p>Reviews</p></ Link  ></li>
        <li>< Link   htmlFor={pricingPageLink}><p>Pricing</p></ Link  ></li>
        <li>< Link   htmlFor=""></ Link  ></li> */}
        </ul>
      </section>
    </>
  );
}
