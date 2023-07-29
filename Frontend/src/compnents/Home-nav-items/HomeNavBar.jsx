import React from 'react'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import HomePageNavItems from './HomePageNavItems'
export default function HomeNavBar() {
  return (
    <>
 <nav className='nav'>
      <LandingPageToggle innerText="Credits: 0" pageLink="/register"/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
        {<HomePageNavItems/>}     
      </ul>
  </nav>  
    </>
  )
}
