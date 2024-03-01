import React from "react";
import BrandLogo from "./Sections/BrandLogo";
import ProductDetails from "./Sections/ProductDetails";
import ResourcesSection from "./Sections/ResourcesSection";
import Company from "./Sections/Company";
import SocialMediaIcons from "./Sections/SocialMediaIcons";
import CopyrightSection from "./Sections/CopyrightSection";
import compConstValues from "../../component-utils/comp-constant-values/compConstValues";

export default function FooterPages() {
  return (
    <footer className="pages-footer">
      <section className="brandIdentityCont">
        <BrandLogo />
        <section className="brand-identity-options-large-screen">
          <section className="moto">
            <p>{compConstValues.heroSecondHeadingtext}</p>
          </section>
          <SocialMediaIcons />

          <CopyrightSection />
        </section>
      </section>
      <section className="footer-page-links-cont">
        <ProductDetails />
        <ResourcesSection />
        <Company />
      </section>

      <section className="social-media-icons-cont-footer">
        <SocialMediaIcons />
      </section>

      <div className="copyright-section">
        <CopyrightSection />
      </div>
    </footer>
  );
}
