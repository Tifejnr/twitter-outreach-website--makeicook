import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import FooterPages from "../Footer/FooterPages";
import CTAForTermsPolicy from "../Terms-and-privacy/CTAForTermsPolicy";
import changeTabTitle from "../../component-utils/change-tab-title/changeTabTitle";
import pagesTitleConstValues from "../../component-utils/comp-constant-values/pagesTitleConstValues";

import compConstValues from "../../component-utils/comp-constant-values/compConstValues";

export default function AboutUsPage() {
  changeTabTitle(pagesTitleConstValues.aboutUs);

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
            <h2>About Make I Cook</h2>
            <p>Learn about us</p>
          </header>
        </section>
        <section className="about-us-text-cont">
          <article>
            <section>
              <p>
                Make I Cook (Twitter outreach extension) is your ultimate
                companion for making more sales through Twitter outreach, where
                efficiency meets excellence. With our innovative features in
                Twitter outreach extension, you can bid farewell to wasting time
                and effort and hello to closing more sales through twitter
                outreach.
              </p>
            </section>

            <section>
              <h3>Our Purpose</h3>

              <p>
                At Make I Cook (Twitter outreach extension), our driving force
                is to empower twitter outreach teams or individuals to make more
                sales by helping them with tools needed to make twitter outreach
                process safer, faster, and highly converting.
              </p>

              <p>
                We understand the challenges twitter outreach teams or
                individuals face in sending hundreds of Dms per day to qualified
                leads to close sales, which is why we&apos;re dedicated to
                providing solutions that streamline your workflow and maximize
                your productivity.
              </p>
            </section>

            <section>
              <h3>Our Mission</h3>
              <p>
                Our mission is simple: to make twitter outreach teams make more
                sales with great ease, while keeping their accounts 100% safe.
              </p>

              <p>
                We strive to equip twitter outreach teams or individuals with
                the tools they need to scrape as much as possible leads, process
                these leads, mass message processed leads, chat effectively with
                prospects, mass follow up prospects who don&apos;t reply, in a
                competitive marketplace, allowing them to achieve make more
                sales with confidence and efficiency.
              </p>
            </section>

            <section>
              <h3>How We Help</h3>
              <div>
                Make I Cook or Twitter outreach extension simplifies twitter
                outreach experience by streamlining a wide range of tasks,
                including allowing you:
                <ul>
                  <li>
                    scrape leads from : Twitter search results, An
                    account&apos;s followers list, An account&apos;s following
                    list, Replies under a tweet
                  </li>
                  <li>
                    Mass message Twitter profiles with 𝗭𝗲𝗿𝗼 𝗿𝗶𝘀𝗸 of your account
                    getting banned, and with perfectly personalized greeting
                    lines that increase reply rate.
                  </li>

                  <li>
                    Save all your reply scripts and access them instantly while
                    chatting with prospects with just a button click.
                  </li>
                  <li>
                    Add messaged Twitter profiles to a Google Sheet, enabling
                    you to continue the messaging process on any device while
                    ensuring that people who have already been messaged on
                    another device are not contacted again.
                  </li>
                  <li>
                    Get comprehensive information summary about each prospect
                    who replies your message, based on their bio, tweets, and
                    retweets, enabling you to adjust your messaging to each
                    propsect personality
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3>Our Customers</h3>
              <p>
                Make I Cook caters to twitter outreach teams or individuals at
                all levels, from newcomers looking to establish themselves to
                seasoned professionals seeking to make more sales. Our diverse
                customer base spans various industries and skill sets, united by
                a common goal: to make more sales through twitter outreach.
              </p>

              <p>
                Ready to make more sales through Twitter Outreach? Install
                Twitter outreach extension today and start making more sales.
                Your success story awaits - one click at a time.
              </p>
            </section>
          </article>
        </section>

        <CTAForTermsPolicy title={compConstValues.aboutUsPageCTA} />
      </section>
      <FooterPages />
    </>
  );
}
