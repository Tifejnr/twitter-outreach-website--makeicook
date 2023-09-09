import React from 'react'
import ContactUs from './ContactUs';
import LandingPageToggle from '../../Main-nav-bar/LandingPageToggle';
import PagesNavItems from '../../LandingPage/PagesNavItems';
import NavLogo from '../../Main-nav-bar/NavLogo';
import FooterPages from '../Footer/FooterPages';
import { changeTabTitle } from '../../utilis/changeTabTitle';
import CTAForTermsPolicy from '../Terms-and-privacy/CTAForTermsPolicy';


const contactUsTabTitle= "Contact us – Collab for Trello"
const contactPageSeoToMatch= "Add trello members to multiple boards at once"

export default function MainContactPage() {

  changeTabTitle(contactUsTabTitle)
  return (
    <>
  <nav className='nav'>

       <LandingPageToggle pagelink="#" noCredits={true}/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
      <PagesNavItems/>  

      </ul>
  </nav>

    <section className="main-pricing-section-alone contact-us-main">
        <ContactUs/>
        <CTAForTermsPolicy title={contactPageSeoToMatch}/>
    </section>

    <FooterPages/>

  </>
  )
}
