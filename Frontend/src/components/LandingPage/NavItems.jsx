// import useStore from "../Hooks/Zustand/usersStore";
// import { useState } from "react";
import smoothScroll from "../auth/utils/smooth-scroll/smoothScroll";
import closeMenuBar from "../auth/utils/smooth-scroll/closeMenuBar";
import allLinks from "../auth/utils/links/allLinks";

export default function NavItemsLandingPage() {
  // const setIsMenuIconShowing = useStore((state) => state.setIsMenuIconShowing);

  const faqSection = "#faq__text-container";
  const pricingSection = ".pricing-section";
  const toolsSection = ".tools-section-cont";
  const testimonialsSection = ".testimonials-cont";

  const faqClick = () => {
    smoothScroll(faqSection, 80);
    closeMenuBar();
    // setIsMenuIconShowing(true);
  };

  const pricingClick = () => {
    smoothScroll(pricingSection, 36);
    closeMenuBar();
    // setIsMenuIconShowing(true);
  };

  const toolsClick = () => {
    smoothScroll(toolsSection, 60);
    closeMenuBar();
    // setIsMenuIconShowing(true);
  };

  const testimonialsSectionClick = () => {
    smoothScroll(testimonialsSection, 70);
    closeMenuBar();
    // setIsMenuIconShowing(true);
  };

  return (
    <>
      <li>
        <ul className="inner-nav-item-container">
          <li className="nav-list" onClick={toolsClick}>
            <h3 id="tools">Benefits</h3>
          </li>
          <li className="nav-list" onClick={pricingClick}>
            <h3 className="pricing">Pricing</h3>
          </li>
          <li className="nav-list" onClick={faqClick}>
            <h3 className="faq">FAQ</h3>
          </li>
          <li className="nav-list" onClick={testimonialsSectionClick}>
            <h3 className="testimonials">Testimonials</h3>
          </li>
        </ul>
      </li>

      <li>
        <ul className="inner-nav-item-container">
          <a href={allLinks.loginPagePath}>
            <h3 id="loginLandingPage">Log In</h3>
          </a>
          <a href={allLinks.signUpPage} className="sign-up-cont">
            <h4 className="sign-up">Start for free</h4>
          </a>
        </ul>
      </li>
    </>
  );
}
