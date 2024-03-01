import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import FooterPages from "../Footer/FooterPages";
import CTAForTermsPolicy from "../Terms-and-privacy/CTAForTermsPolicy";

const aboutPageSeoToMatch =
  "Remove same trello members from multiple boards at once";

import "../../../styles-css/landingpage.css";

export default function AboutUsPage() {
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

      <section className="tools-section-cont main-pricing-section-alone about-us-main">
        <section className="pricing-section about-section-inner-cont">
          <header>
            <h2>About Work for Reputation</h2>
            <p>Learn about us</p>
          </header>
        </section>
        <section className="about-us-text-cont">
          <article>
            <section>
              <p>
                Work for Reputation (WFR) is your ultimate companion for
                mastering Upwork, where efficiency meets excellence. With our
                innovative features in WFR Toolkit, you can bid farewell to
                wasting time and effort and hello to winning projects in record
                time.
              </p>
            </section>

            <section>
              <h3>Our Purpose</h3>

              <p>
                At Work for Reputation (WFR), our driving force is to empower
                Upwork freelancers to thrive on Upwork by simplifying the
                intricacies of the platform.
              </p>

              <p>
                We understand the challenges Upwork freelancers face in crafting
                converting cover letters to win jobs, which is why we&apos;re
                dedicated to providing solutions that streamline your workflow
                and maximize your productivity.
              </p>
            </section>

            <section>
              <h3>Our Mission</h3>
              <p>
                Our mission is simple: to revolutionize the freelance experience
                on Upwork by streamlining tasks and enabling you to focus on
                what you do best – delivering exceptional work.
              </p>

              <p>
                We strive to equip Upwork freelancers with the tools they need
                to succeed in a competitive marketplace, allowing them to
                achieve their goals with confidence and efficiency.
              </p>
            </section>

            <section>
              <h3>How We Help</h3>
              <div>
                Work for Reputation Toolkit or WFR Toolkit simplifies freelancer
                experience on Upwork by streamlining a wide range of tasks,
                including:
                <ul>
                  <li>
                    Automatic retrieval of client names for personalized
                    proposals, saving you valuable time and effort.
                  </li>
                  <li>
                    One-click filtering for tailored job searches, ensuring you
                    only see opportunities that match your preferences.
                  </li>

                  <li>
                    Convenient display of job posts above cover letters,
                    eliminating the need for constant scrolling and
                    multitasking.
                  </li>
                  <li>
                    Simplified selection of payment terms and profile options,
                    making the proposal submission process smoother and more
                    efficient.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3>Our Customers</h3>
              <p>
                Work for Reputation caters to Upwork freelancers of all levels,
                from newcomers looking to establish themselves to seasoned
                professionals seeking to optimize their workflow. Our diverse
                customer base spans various industries and skill sets, united by
                a common goal: to succeed on Upwork.
              </p>

              <p>
                Ready to take your Upwork game to the next level? Install WFR
                Toolkit extension today and discover the transformative power of
                automation. Your success story awaits – one click at a time.
              </p>
            </section>
          </article>
        </section>

        <CTAForTermsPolicy title={aboutPageSeoToMatch} />
      </section>
      <FooterPages />
    </>
  );
}
