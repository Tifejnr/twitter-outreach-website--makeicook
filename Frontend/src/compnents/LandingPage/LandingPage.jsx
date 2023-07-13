import React from 'react'
import NavItemsLandingPage from './NavItems'
import Hero from './Body/Hero'
import NavToggleIcon from '../Main-nav-bar/NavToggleIcon'
import NavLogo from '../Main-nav-bar/NavLogo'

export default function LandingPage() {

  
  return (
<>
  <nav className='nav'>
       
       <NavToggleIcon/>

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
