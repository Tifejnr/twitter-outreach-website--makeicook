import React from "react";
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../../LandingPage/PagesNavItems";
import NavLogo from "../../Main-nav-bar/NavLogo";
import FooterPages from "../Footer/FooterPages";
import { changeTabTitle } from "../../utilis/changeTabTitle";

const contactUsTabTitle = "Contact us – CollabforTrello";

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

      <section className="tools-section-cont main-pricing-section-alone">
        <section className="pricing-section about-section-inner-cont">
          <header>
            <h2>About Collab for Trello</h2>
            <p>Learn about our purpose and vision</p>
          </header>
          <section className="about-us-text-cont">
            <article>
              <p>
              Collab for Trello automates Trello members addition and removal across multiple boards and workspaces, 
              saving you time and stress of doing it manually.
              </p>

              <p>
                Our easy-to-use tools allow you to add or remove Trello members with 
              just a few clicks across multiple boards and workspaces.
              </p>

              <p>
                Our purpose is to empower teams to be more productive by automating the tedious tasks of managing Trello memberships across boards and workspaces. 
                We believe that everyone should be able to focus on their most important work, 
                and we're here to help you do just that.
              </p>

              <p>
                Our mission is to make Trello teams more efficient and effective by automating members addition and
                 removal across multiple boards and workspaces. We do this by providing a simple and powerful tools to automate members addition 
                 and removal across multiple boards and workspaces.
              </p>

              <p>
                Collab for Trello helps teams save time and stress by automating the following tasks across multiple boards and workspaces:
                  <ul>
                    <li>Adding team members to multiple Trello boards</li>
                    <li>Removing team members from Trello boards</li>
                  
                    <li>Adding team members to multiple Trello workspaces</li>
                    <li>Removing team members from Trello workspaces</li>
                  
                  </ul>
              </p>

            </article>
          </section>
        </section>
        {/* <ContactUs/> */}
      </section>
      <FooterPages />
    </>
  );
}
