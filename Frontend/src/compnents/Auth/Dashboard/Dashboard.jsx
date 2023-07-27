import React from 'react'
import goBackIcon from "../../../assets/SVGs/goBack.svg"
import DashBody from './DashBody'
import NavLogo from '../../Main-nav-bar/NavLogo'
import AuthFooter from '../AuthFooter'
import LandingPageToggle from '../../Main-nav-bar/LandingPageToggle'
import NavItemsDashBoard from './NavItemsDashBoard'

export default function Dashboard() { 

  return (
    <>
    <nav className='nav dashboard-nav'>
       
       <LandingPageToggle innerText={"Credits: 500"}/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
      <NavItemsDashBoard/>  
      </ul>
  </nav> 

  <DashBody />

  <AuthFooter/>
    </>
  )
}
