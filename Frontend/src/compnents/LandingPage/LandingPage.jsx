import React, {useRef} from 'react'
import NavItemsLandingPage from './NavItems'
import Hero from './Body/Hero'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import BelowHero from './Body/BelowHero'
import BelowTestimonials from './Body/BelowTestimonials'
import Testimonials from './Body/Testimonials'
import FAQ from './FAQ/FAQ'

export default function LandingPage() {
return (
<>
  <nav className='nav'>
       
       <LandingPageToggle/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
     <NavItemsLandingPage/>  
      </ul>
  </nav>  

  <Hero/>
  <BelowHero/>
  <FAQ/>
  <Testimonials/>
  <BelowTestimonials/>

</>
  )
}
