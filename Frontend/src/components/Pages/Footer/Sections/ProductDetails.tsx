import React from "react";
import Link from "next/link";
import pagesLinkObj from "@/app/components/component-utils/pageLinks/pagesLinkObj";
export default function ProductDetails() {
  return (
    <>
      <section>
        <h3>Product</h3>

        <ul>
          <Link href={pagesLinkObj.toolsLink}>
            <p>WFR Toolkit</p>
          </Link>

          <Link href={pagesLinkObj.faqLink}>
            <p>FAQ</p>
          </Link>

          <Link href={pagesLinkObj.reviewsLink}>
            <p>Testimonials</p>
          </Link>

          <Link href={pagesLinkObj.pricingLink}>
            <p>Pricing</p>
          </Link>

          {/* <Linkhref=""></Link> */}
        </ul>
      </section>
    </>
  );
}
