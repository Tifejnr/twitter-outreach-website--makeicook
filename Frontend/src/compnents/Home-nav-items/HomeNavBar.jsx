import React from 'react'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import HomePageNavItems from './HomePageNavItems'
export default function HomeNavBar(props) {
  return (
    <>
 <nav className='nav'>
      <LandingPageToggle innerText={props.innerText} pageLink={props.pageLink}/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
        {<HomePageNavItems showCredits={props.innerText}/>}     
      </ul>
  </nav>  
    </>
  )
}
