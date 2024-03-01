import React from "react";
import Link from "next/link";
import pagesLinkObj from "@/app/components/component-utils/pageLinks/pagesLinkObj";

export default function Company() {
  return (
    <section>
      <h3>Company</h3>
      <ul>
        <Link href={pagesLinkObj.aboutPageLink}>
          <p>About us</p>
        </Link>

        <Link href={pagesLinkObj.contactPageLink}>
          <p>Contact us</p>
        </Link>

        <Link href={pagesLinkObj.mediaPageLink}>
          <p>Media</p>
        </Link>

        <Link href={pagesLinkObj.termsPageLink}>
          <p>Terms</p>
        </Link>

        <Link href={pagesLinkObj.privacyPolicyPageLink}>
          <p>Privacy Policy</p>
        </Link>
      </ul>
    </section>
  );
}
