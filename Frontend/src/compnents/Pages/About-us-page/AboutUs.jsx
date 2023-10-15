import { Link } from "react-router-dom";
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../../LandingPage/PagesNavItems";
import NavLogo from "../../Main-nav-bar/NavLogo";
import FooterPages from "../Footer/FooterPages";
import { changeTabTitle } from "../../utilis/changeTabTitle";
import CTAForTermsPolicy from "../Terms-and-privacy/CTAForTermsPolicy";

const contactUsTabTitle = "About us – Collab for Trello";
const aboutPageSeoToMatch =
  "Remove same trello members from multiple boards at once";

export default function AboutUsPage() {
  changeTabTitle(contactUsTabTitle);
  return (
    <>
      <nav className="nav">
        <LandingPageToggle pagelink="#" noCredits={true} />

        <ul className="nav__menu">
          <li>
            <NavLogo />
          </li>

          <PagesNavItems />
        </ul>
      </nav>

      <section className="tools-section-cont main-pricing-section-alone about-us-main">
        <section className="pricing-section about-section-inner-cont">
          <header>
            <h2>About Collab for Trello</h2>
            <p>Learn about us</p>
          </header>
          <section className="about-us-text-cont">
            <article>
              <section>
                <p>
                  Collab for Trello automates Trello members addition and
                  removal across multiple boards and workspaces, saving you time
                  and stress of doing it manually.
                </p>

                <p>
                  Our easy-to-use tools allow you to add or remove Trello
                  members with just a few clicks across multiple boards and
                  workspaces.
                </p>
              </section>

              <section>
                <h3>Our Purpose</h3>

                <p>
                  Our purpose is to empower teams to be more productive by
                  automating the tedious tasks of managing Trello memberships
                  across boards and workspaces.
                </p>

                <p>
                  We believe that everyone should be able to focus on their most
                  important work, and we're here to help you do just that.
                </p>
              </section>

              <section>
                <h3>Our Mission</h3>
                <p>
                  Our mission is to make Trello teams more efficient and
                  effective by automating members addition and removal across
                  multiple boards and workspaces.
                </p>

                <p>
                  We do this by providing a simple and powerful tools to
                  automate members addition and removal across multiple boards
                  and workspaces.
                </p>
              </section>

              <section>
                <h3>How We Help</h3>
                <p>
                  Collab for Trello helps teams save time and stress by
                  automating the following tasks across multiple boards and
                  workspaces:
                  <ul>
                    <li>Adding team members to Trello boards</li>
                    <li>Removing team members from Trello boards</li>

                    <li>Adding team members to Trello workspaces</li>
                    <li>Removing team members from Trello workspaces</li>
                  </ul>
                </p>
              </section>

              <section>
                <h3>Our Customers</h3>
                <p>
                  Collab for Trello is used by teams of all sizes, from small
                  businesses to large enterprises. Our customers include:[List
                  of customers]
                </p>
              </section>

              <section>
                <h3>Real Time Saving Impact</h3>
                <p>
                  Collab for Trello can save you significant time managing
                  Trello memberships.
                </p>

                <p>
                  For example, if manually removing a member from 10 different
                  boards takes 70 seconds (assuming each board removal takes 7
                  seconds).
                </p>

                <p>
                  Collab for Trello tools do the same in just 2.5 seconds (each
                  member removal takes about 0.25 seconds). That's a time
                  savings of about 95%!
                </p>
              </section>
            </article>
          </section>
        </section>

        <CTAForTermsPolicy title={aboutPageSeoToMatch} />
      </section>
      <FooterPages />
    </>
  );
}
