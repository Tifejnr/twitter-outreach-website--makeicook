import NavItemsLandingPage from "./NavItems";
import Hero from "./Body/Hero";
import LandingPageToggle from "../Main-nav-bar/LandingPageToggle";
import NavLogo from "../auth/utils/components/NavLogo";
import BelowHero from "./Body/BelowHero";
import BelowTestimonials from "./Body/BelowTestimonials";
import Testimonials from "./Body/Testimonials";
import FAQ from "./FAQ/FAQ";
// import PricingPage from "../PricingPage/PricingPage";
import ToolsSection from "./Tools/Tools";
import FooterPages from "../Pages/Footer/FooterPages";
import pagesLinkObj from "../component-utils/pageLinks/pagesLinkObj";

export default function LandingPage() {
  return (
    <>
      <nav className="nav">
        <LandingPageToggle
          innerText="Free start"
          pageLink={pagesLinkObj.registerPageLink}
        />

        <ul className="nav__menu landing-page-nav-menu">
          <section className="nav-logo-landing-page-cont">
            <NavLogo />
          </section>

          <NavItemsLandingPage />
        </ul>
      </nav>

      <Hero />
      <BelowHero />
      <ToolsSection />
      <Testimonials />
      {/* <PricingPage /> */}
      {/* <FAQ /> */}

      <BelowTestimonials />
      <FooterPages />
    </>
  );
}
