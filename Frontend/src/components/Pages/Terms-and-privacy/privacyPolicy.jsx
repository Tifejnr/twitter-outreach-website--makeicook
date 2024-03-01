import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import FooterPages from "../Footer/FooterPages";
import CTAForTermsPolicy from "./CTAForTermsPolicy";
import pagesLinkObj from "../../component-utils/pageLinks/pagesLinkObj";

const privacyPageSeoToMatch =
  "Add same trello members to multiple boards at once";

export default function PrivacyPolicyPage() {
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
            <h2>Privacy Policy</h2>
          </header>
        </section>

        <section
          className="pricing-section about-us-text-cont"
          id="privacy-policy-cont"
        >
          <article>
            <section>
              <p>
                ‘workforreputation.com’, ‘Work for Reputation’, ‘we’, ‘us’,
                ‘Platform’, ‘Company’, or ‘our’. values your privacy and hence
                provides you with the following information.
              </p>

              <p>
                On this page, you may find out what information about you we
                gather when you interact with us, why we collect it and how we
                use, keep, and disclose it, as well as how we handle the
                personal data you offer us. Work for Reputation enables
                compliance with the GDPR when it processes personal data on
                behalf of its customers. If you live in California and want to
                learn more about your rights under the California Consumer
                Privacy Act of 2018 (“CCPA“).
              </p>

              <div>
                If you are one of the following, we may collect, utilize, or
                otherwise handle personal data about you:
                <ul>
                  <li>
                    a contact whose information is utilized for our B2B Database
                    of business contact data (“Contact”)
                  </li>
                  <li>
                    an authorized user Work for Reputation agreeing to our Terms
                    of Service (“End User”)
                  </li>
                  <li>
                    a visitor of our website and online services (“Visitor”).
                  </li>
                </ul>
              </div>

              <p>
                Our <span></span>
                <Link href={pagesLinkObj.termsPageLink}>Terms of Service</Link>
                (the “Terms of Service” or “Agreement”) are complemented by this
                Privacy Policy. You should not use this website or use our
                Services if you do not agree with this Privacy Policy or any
                part of it.
              </p>
            </section>

            <section>
              <h3>Our Commitments</h3>
              <p>
                Work for Reputation is dedicated to offering its cutting-edge
                service while respecting everyone&lsquo;s privacy and abiding by
                all applicable privacy and data protection regulations.
              </p>

              <p>
                We are devoted to offering the most helpful and accurate results
                to our end users, and we have developed internal steps to ensure
                accuracy and relevance. To the degree practically possible, we
                use procedures to cross-check and verify the accuracy of the
                data in the Work for Reputation&apos;s Database, and we do not
                maintain personal or private contact information in our
                database.
              </p>

              <p>
                Work for Reputation only collects data that is required and does
                not gather sensitive information like health, religious views,
                political viewpoints, or race.
              </p>
            </section>

            <section>
              <h3>We gather the following types of data</h3>

              <p>
                We collect and systematically analyze data concerning Work for
                Reputation, customers, and visitors as part of our information
                management practices. This entails the comprehensive gathering,
                storage, and evaluation of information to better understand and
                engage with individuals who interact with our organization.
              </p>
            </section>

            <section>
              <h3>Information in our Database</h3>
              <p>
                Contact Attributes and Company Information are included in the
                Data we supply to our users. We only give information that would
                be found on a business card or in a business email signature
                block.
              </p>

              <p>
                When our End Users engage with us, we collect data directly from
                them. For example, whether End Users register an account, use
                our Services, or contact us through our website or support
                channels, this is the situation.
              </p>

              <div>
                The following information is supplied or derived:
                <ul>
                  <li>name</li>
                  <li>email address</li>
                  <li>user activity</li>
                  <li>location</li>
                  <li>
                    any other information you freely supply us when you contact
                    us
                  </li>
                </ul>
              </div>
              <p>We do not sell any information provided to us by our users.</p>
            </section>

            <section>
              <h3>Data gathered from paying customers</h3>
              <p>
                Work for Reputation End Users are required to submit their email
                address and payment details for paid plans (including a credit
                card number). We do not collect or process your payment
                information directly for this.
              </p>
            </section>

            <section>
              <h3>How long do we retain your information?</h3>
              <p>
                We’ve created a retention policy that determines retention
                durations based on the type of information obtained and the
                purpose for which it was collected, as well as the situation’s
                requirements and the necessity to remove obsolete, unneeded
                information as soon as possible.
              </p>

              <p>
                Work for Reputation Contacts: We keep your Data for as long as
                we need it to perform our Services and then archive it to meet
                our legal responsibilities, settle disputes, and enforce our
                rules.
              </p>

              <p>
                We save your data for as long as you have an active Work for
                Reputation account. In order to comply with our legal and
                contractual obligations or to protect ourselves from any
                potential disputes (as required by laws applicable to
                record-keeping and to have proof and evidence concerning our
                relationship, should any legal issues arise following the
                termination of your account), we may keep your data in an
                intermediate archive following the deletion of your account.
              </p>
            </section>

            <section>
              <h3>Changes to this policy</h3>
              <p>
                Work for Reputation reserves the right to alter this Privacy
                Policy at any time to reflect changes in the way we treat data.
                If we make material changes to this policy (such as a change in
                our processing purposes, a change in the identity of the
                controller, or even a change in the way you can exercise your
                rights in relation to our processing activities), we will notify
                you via email or a notice on our website’s homepage, as
                appropriate, prior to the changes becoming effective.
              </p>
            </section>

            <section>
              <h3>Contact Us</h3>
              <p>
                If you have any questions regarding the Terms and Conditions,
                you may contact us on workforreputation@gmail.com
              </p>
            </section>

            <p id="last-updated-text-privacy-policy">
              Last Updated: January 18, 2024.
            </p>
          </article>
        </section>

        <CTAForTermsPolicy title={privacyPageSeoToMatch} />
      </section>

      <FooterPages />
    </>
  );
}
