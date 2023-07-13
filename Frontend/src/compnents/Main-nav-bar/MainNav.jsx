import React from 'react'

import NavItemsLandingPage from '../LandingPage/NavItems'
import HomePageNavItems from '../Home-nav-items/HomePageNavItems'
import Hero from '../LandingPage/Body/Hero'
import NavToggleIcon from './NavToggleIcon'
import NavLogo from './NavLogo'
import getCookie from '../../JS functions/Auth/cookie-handling/get-cookie'



export default function MainNav() {

  const isLoggedIn= getCookie();

  return (
<>
  <nav className='nav'>
       
       <NavToggleIcon/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
        {isLoggedIn?<HomePageNavItems/>:<NavItemsLandingPage/>}     
      </ul>
  </nav>  

      {!isLoggedIn && <Hero/>}
</>
  )
}



