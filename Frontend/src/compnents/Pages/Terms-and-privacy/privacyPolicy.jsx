import { Link } from 'react-router-dom';
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../../LandingPage/PagesNavItems";
import NavLogo from "../../Main-nav-bar/NavLogo";
import FooterPages from "../Footer/FooterPages";
import { changeTabTitle } from "../../utilis/changeTabTitle";
import handlePageRefreshOnLoad from '../../utilis/refreshPageOnLoad';

const PrivacyPolicyPageTabTitle = "Terms & Conditions – Collab for Trello";
const registerLink= "/register"
const termsPageLink= "/terms";

export default function PrivacyPolicyPage() {
  changeTabTitle(PrivacyPolicyPageTabTitle);
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
            <h2>Privacy Policy</h2>
          </header>

          <section className="about-us-text-cont">
            <article>
              <section>
              <p>
           ‘CollabforTrello.com’, ‘Collab for Trello’, ‘we’, ‘us’, ‘Platform’, ‘Company’, or ‘our’. values your privacy and hence provides you with the following information. 
              </p>

              <p>
            On this page, you may find out what information about you we gather when you interact with us, why we collect it and how we use, keep, and disclose it, as well as how we handle the personal data you offer us.
             Collab for Trello enables compliance with the GDPR when it processes personal data on behalf of its customers.
             If you live in California and want to learn more about your rights under the California Consumer Privacy Act of 2018 (“CCPA“).
             You can also read upon our <Link>Cookie Policy.</Link> This Privacy Statement (“Policy”) explains how we handle the information you submit to us via CollabforTrello.
              </p>

              <p>
               If you are one of the following, we may collect, utilize, or otherwise handle personal data about you:
               <ul>
                <li>a contact whose information is utilized for our B2B Database of business contact data (“Contact”)</li>
                <li>an authorized user Collab for Trello agreeing to our Terms of Service (“End User”)</li>
                <li>a visitor of our website and online services (“Visitor”).</li>
               </ul>
              </p>

              <p>
                Our <Link to={termsPageLink}>Terms of Service</Link> (the “Terms of Service” or “Agreement”) are complemented by this Privacy Policy. 
                You should not use this website or use our Services if you do not agree with this Privacy Policy or any part of it.
              </p>
              </section>

            <section>
                <h3>Our Commitments</h3>
                <p>
                Collab for Trello is dedicated to offering its cutting-edge service while respecting everyone’s privacy 
                 and abiding by all applicable privacy and data protection regulations.   
                </p>

                <p>
                 We are devoted to offering the most helpful and accurate results to our end users, and we have developed internal steps to ensure accuracy and relevance. 
                 To the degree practically possible, we use procedures to cross-check and verify the accuracy of the data in the Collab for Trello's Database,
                 and we do not maintain personal or private contact information in our database.
                </p>

                <p>Collab for Trello only collects data that is required and does not gather sensitive information like health, religious views, political viewpoints, or race.</p>
            </section>


              <section>
                <h3>
                We gather the following types of data
                </h3>
                
                <p>
                 We collect and systematically analyze data concerning Collab for Trello, customers, and visitors as part of our information management practices. 
                 This entails the comprehensive gathering, storage, and evaluation of information to better understand and engage with individuals who interact with our organization.
                </p>

              </section>

              <section>
                <h3>
                Information in our Database
                </h3>
                <p>
                Contact Attributes and Company Information are included in the Data we supply to our users. 
                We only give information that would be found on a business card or in a business email signature block.
                </p>

                <p>
                When our End Users engage with us, we collect data directly from them. For example, whether End Users register an account, 
                use our Services, or contact us through our website or support channels, this is the situation. 
                </p>


             <p>The following information is supplied or derived:
                <ul>
                    <li>name</li>
                    <li>email address</li>
                    <li>user activity</li>
                    <li>location</li>
                    <li>any other information you freely supply us when you contact us</li>
                </ul>
                </p>
                <p>
                We do not sell any information provided to us by our users.
                </p>

              </section>

              <section>
                <h3>Data gathered from paying customers</h3>
                <p>
                 Collab for Trello End Users are required to submit their email address and payment details for paid plans (including a credit card number).
                 We do not collect or process your payment information directly for this.
                </p>
              </section>

              <section>
                <h3>How long do we retain your information?</h3>
                <p>
                    We’ve created a retention policy that determines retention durations based on the type of information obtained and 
                    the purpose for which it was collected, as well as the situation’s requirements and the necessity to remove obsolete, 
                    unneeded information as soon as possible.                    
                </p>
                
              </section>
              

              <section>
                <h3>Refunds</h3>
                <p>
                  The subscription fee is strictly non-refundable, and this policy applies without exception, regardless of the circumstances or reasons behind the refund request. 
                  Whether due to user preferences, technical issues, or any other factor, once the subscription fee is paid,
                  it is considered final and non-reversible, reinforcing our commitment to a no-refund policy.
                </p>


              </section>

              <section>
                <h3>Credits</h3>
                <p>
                The credits are added to your account after subscription. Your credits do not expire. You can always come back to meet your credits intact and use them when you need to do so.
                </p>
              </section>

              <section>
                <h3>Severability</h3>
                <p>
              If a court rules that any provision of these Terms is invalid, unlawful, or unenforceable,
              such decisions will have no bearing on the legality or
              enforceability of the remaining sections of the Terms, and each provision will be treated as independent, severable, and distinct from the others.
                </p>
              </section>

              <section>
                <h3>Contact Us</h3>
                <p>
               If you have any questions regarding the Terms and Conditions, you may contact us on collabfortrello@gmail.com
                </p>
              </section>

              <p>Last Updated: August 29, 2023.</p>

            </article>
          </section>
        </section>

        <section className="about-us-CTA-section">
          <h2>Automate trello members addition and removal</h2>
          <section className='call-to-action-cont'>
              <Link  to={registerLink} className='oauth-button' onClick={(e)=> {
                e.preventDefault()
                handlePageRefreshOnLoad(registerLink)
              }}>
              
              <h2>Start for free <span className='floating-arrow'>&#8594;</span> </h2>
              </Link>
              <ul>
                <li><p> 5 free credits for trial</p></li>
                <li> <p>No credit card required</p> </li>       
              </ul>
            </section>
        </section>
      </section>
      <FooterPages />
    </>
  );
}
