import React from 'react'
import NavItemsLandingPage from './NavItems'
import Hero from './Body/Hero'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'

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
</>
  )
}
