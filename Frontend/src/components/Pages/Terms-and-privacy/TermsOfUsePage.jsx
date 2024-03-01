import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import FooterPages from "../Footer/FooterPages";
import CTAForTermsPolicy from "./CTAForTermsPolicy";
import pagesLinkObj from "../../component-utils/pageLinks/pagesLinkObj";

const termsPageSeoToMatch =
  "Remove same trello members from multiple boards at once";

import "../../../styles-css/landingpage.css";

export default function TermsOfUsePage() {
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
            <h2>Terms of Service</h2>
          </header>
        </section>

        <section className="pricing-section about-us-text-cont">
          <article>
            <section>
              <p>
                These are the Terms and Conditions of Use that regulate your
                relationship with ‘workforreputation.com’’, ‘Work for
                Reputation’, ‘we’, ‘us’, ‘Platform’, ‘Company’, or ‘our’. By
                using Work for Reputation or registering for an account, you
                agree to the terms and conditions which will result in a legal
                agreement between you and workforreputation.com’. These Terms
                are meant to inform Users about the limitations and equirements
                that must be considered and followed when using Work for
                Reputation services.
              </p>

              <p>
                Any registration on the Platform means an unconditional
                acceptance of the Terms and Conditions, which the User
                acknowledges having read and understood. You should not use the
                Service if you breach these Terms of Service or if you do not
                agree to these Terms of Service.
              </p>

              <p>
                All terminologies in the Terms and Conditions must be read in
                conjunction with the <span></span>
                <a
                  href={pagesLinkObj.privacyPolicyPageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy.
                </a>
              </p>
            </section>

            <section>
              <h3>Changes to the Terms</h3>

              <p>
                We reserve the right to change these Terms of Service at any
                time by publishing new versions on the Website or otherwise
                informing you. All such modifications will take effect when the
                updated Terms of Service are posted on the Website, or when you
                are given notice, whichever comes first.
              </p>
            </section>

            <section>
              <h3>Changes to the Service</h3>
              <p>
                We have the right to modify the features and functioning of the
                Service at any time. This might involve adding, changing, or
                eliminating any of the Service’s features or capabilities. Any
                new version of the Service will be subject to the Terms of
                Service. We may also suspend or terminate the Service. In
                addition, we reserve the right to charge fees for new or
                existing features of the Service.
              </p>
            </section>

            <section>
              <h3>Support for Services</h3>
              <p>
                Work for Reputation will offer appropriate assistance with the
                Services. Work for Reputation developed a number of tools to
                assist users with commonly asked concerns as well as other
                technical and general support difficulties. Work for Reputation
                also tests regular updates, maintenance, troubleshooting and
                other methods to improve the Services. Work for Reputation does
                not guarantee that any of the above will continue to operate,
                and it has the right to alter, decrease, limit, or cancel its
                maintenance and support activities at any time.
              </p>
            </section>

            <section>
              <h3>Account</h3>
              <p>
                Users must register or create a user account to use the Service.
                Users must supply all needed data or information comprehensively
                and truthfully. Failure to do so will result in the Service
                becoming unavailable or suspension of your account. Users are
                responsible for maintaining the security and confidentiality of
                their login credentials. As a result, Users are also obliged to
                select passwords that fulfill the Website’s highest security
                requirements. Users agree to be solely responsible for any
                activities that take place under their username and password
                when they register. If Users believe their personal information,
                including but not limited to user accounts, access credentials,
                or personal data, has been breached, unjustly disclosed, or
                misused, they must promptly and explicitly notify us using our
                contact information.
                <span></span> <span></span>
                <a href="/contact-us"> Contact us</a>
              </p>
            </section>

            <section>
              <h3>Payment & Subscription</h3>
              <p>
                You agree to pay &apos;workforreputation.com&apos; the fees
                specified for that service by selecting a subscription plan.
                Your invoice will include the subscription or purchase price.
                You allow us to charge any credit card or other payment method
                we have on record for you to collect the then-applicable fee.
                Work for Reputation maintains the right to amend the Payment
                Terms and fees by giving you thirty (30) days written notice.
                You can cancel your Work for Reputation account at any time from
                the dashboard provided to you. Written notices refer to, but are
                not limited to, website, emails & in-app notifications. Work for
                Reputation includes access to email support at
                https://workforreputation.com/contact-us/. “Contact Us” means
                the ability to make requests for technical support assistance by
                email at any time concerning the use of Work for Reputation.
                Work for Reputation will assist in accordance with our
                established standards, procedures, and policies. Please note
                that repeated Free Account registrations are not permitted,
                whether for business, educational, or personal purposes. If we
                detect numerous registrations, we retain the right to cancel all
                old and new accounts at our discretion.
              </p>
            </section>

            <section>
              <h3>Refunds</h3>
              <p>
                The subscription fee is strictly non-refundable, and this policy
                applies without exception, regardless of the circumstances or
                reasons behind the refund request. Whether due to user
                preferences, technical issues, or any other factor, once the
                subscription fee is paid, it is considered final and
                non-reversible, reinforcing our commitment to a no-refund
                policy.
              </p>
            </section>

            <section>
              <h3>Severability</h3>
              <p>
                If a court rules that any provision of these Terms is invalid,
                unlawful, or unenforceable, such decisions will have no bearing
                on the legality or enforceability of the remaining sections of
                the Terms, and each provision will be treated as independent,
                severable, and distinct from the others.
              </p>
            </section>

            <section>
              <h3>Contact Us</h3>
              <p>
                If you have any questions regarding the Terms and Conditions,
                you may contact us on workforrepuataion@gmail.com
              </p>
            </section>

            <p>Last Updated: January 18, 2024.</p>
          </article>
        </section>

        <CTAForTermsPolicy title={termsPageSeoToMatch} />
      </section>

      <FooterPages />
    </>
  );
}
