// import React from "react";
import PricingPage from "../PricingPage/PricingPage";
import LandingPageToggle from "../Main-nav-bar/LandingPageToggle";
import NavLogo from "../auth/utils/components/NavLogo";
import PagesNavItems from "./PagesNavItems";
import FAQ from "../LandingPage/FAQ/FAQ";
import FooterPages from "./Footer/FooterPages";
import changeTabTitle from "../component-utils/change-tab-title/changeTabTitle";
const pricingTabTitle = "Pricing – Collab for Trello";

export default function Pricing() {
  changeTabTitle(pricingTabTitle);
  return (
    <>
      <nav className="nav">
        <LandingPageToggle noCredits={true} pagelink="#" />

        <ul className="nav__menu">
          <li>
            <NavLogo />
          </li>

          <PagesNavItems />
        </ul>
      </nav>

      <section className="main-pricing-section-alone">
        <PricingPage />

        <FAQ />
      </section>

      <FooterPages />
    </>
  );
}
