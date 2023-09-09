import React, {useRef} from 'react'
import NavItemsLandingPage from './NavItems'
import Hero from './Body/Hero'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import BelowHero from './Body/BelowHero'
import BelowTestimonials from './Body/BelowTestimonials'
import Testimonials from './Body/Testimonials'
import FAQ from './FAQ/FAQ'
import PricingPage from '../PricingPage/PricingPage'
import ToolsSection from './Tools/Tools'
import FooterPages from '../Pages/Footer/FooterPages'
import { changeTabTitle } from '../utilis/changeTabTitle'

const landingPageTabTitle= "Automate Trello Members Addition and Removal – Collab for Trello";


export default function LandingPage() {
  changeTabTitle(landingPageTabTitle);
  
return (
<>
  <nav className='nav'>
        
       <LandingPageToggle innerText="Free start" pageLink="/register"/>

      <ul className="nav__menu landing-page-nav-menu">

        <li>
          <NavLogo />
        </li>
       
      <NavItemsLandingPage/>  
      </ul>
  </nav>  

  <Hero/>
  <BelowHero/>
  <ToolsSection/>
  <PricingPage/>
  <FAQ/>
  <Testimonials/>
  <BelowTestimonials/>
  <FooterPages />

</>
  )
}
