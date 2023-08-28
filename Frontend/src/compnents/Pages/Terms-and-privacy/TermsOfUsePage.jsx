import { Link } from 'react-router-dom';
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../../LandingPage/PagesNavItems";
import NavLogo from "../../Main-nav-bar/NavLogo";
import FooterPages from "../Footer/FooterPages";
import { changeTabTitle } from "../../utilis/changeTabTitle";
import handlePageRefreshOnLoad from '../../utilis/refreshPageOnLoad';

const TermsOfUsePageTabTitle = "Terms & Conditions – Collab for Trello";
const registerLink= "/register"
const privacyPolicyLink= "/privacy-policy";

export default function TermsOfUsePage() {
  changeTabTitle(TermsOfUsePageTabTitle);
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
            <h2>Terms of Service</h2>
          </header>
          
          <section className="about-us-text-cont">
            <article>
              <section>
              <p>
              These are the Terms and Conditions of Use that regulate your relationship with ‘CollabforTrello.com’, ‘CollabforTrello’, ‘we’, ‘us’, ‘Platform’, ‘Company’, or ‘our’. 
              By using CollabforTrello or registering for an account, you agree to the terms and conditions which will result in a legal agreement between you and CollabforTrello.com. 
              These Terms are meant to inform Users about the limitations and equirements that must be considered and followed when using CollabforTrello services. 
              </p>

              <p>
              Any registration on the Platform means an unconditional acceptance of the Terms and Conditions,
               which the User acknowledges having read and understood.
               You should not use the Service if you breach these Terms of Service or if you do not agree to these Terms of Service.  
              </p>

              <p>
                All terminologies in the Terms and Conditions must be read in conjunction with the <Link to={privacyPolicyLink}>Privacy Policy.</Link> 
              </p>
              </section>

              <section>
                <h3>
                  Our Purpose
                </h3>
                
                <p>
                  Our purpose is to empower teams to be more productive by automating the tedious tasks of managing Trello memberships across boards and workspaces.  
                </p>

                <p>We believe that everyone should be able to focus on their most important work,
                  and we're here to help you do just that.
                </p>
              </section>

              <section>
                <h3>
                  Our Mission
                </h3>
                <p>
                  Our mission is to make Trello teams more efficient and effective by automating members addition and
                   removal across multiple boards and workspaces.
                </p>

                <p>
                  We do this by providing a simple and powerful tools to automate members addition
                   and removal across multiple boards and workspaces.
                </p>
              </section>

              <section>
                <h3>How We Help</h3>
                <p>
                  Collab for Trello helps teams save time and stress by automating the following tasks across multiple boards and workspaces:
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
                <p>Collab for Trello is used by teams of all sizes, from small businesses to large enterprises. 
                  Our customers include:[List of customers]</p>
              </section>

              <section>
                <h3>Real Time Saving Impact</h3>
                <p>
                 Collab for Trello can save you significant time managing Trello memberships.              
                </p>

                <p>
                  For example, if manually removing 10 members from 10 boards takes 70 seconds (assuming each member removal takes 7 seconds).
                </p>

                <p>Collab for Trello tools do the same in just 2.2 seconds (each member removal takes 0.2 seconds).
                  That's a time savings of 97%!</p>
              </section>

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
