import ContactUs from "./ContactUs";
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import FooterPages from "../Footer/FooterPages";

import "../../../styles-css/contact-page.css";
import "../../../styles-css/landingpage.css";

export default function MainContactPage() {
  return (
    <>
      <nav className="nav">
        <LandingPageToggle pagelink="#" noCredits={true} />

        <ul className="nav__menu">
          <section className="nav-logo-landing-page-cont">
            <NavLogo />
          </section>

          <PagesNavItems />
        </ul>
      </nav>

      <section className="contact-us-page-cont">
        <ContactUs />
      </section>

      <FooterPages />
    </>
  );
}
