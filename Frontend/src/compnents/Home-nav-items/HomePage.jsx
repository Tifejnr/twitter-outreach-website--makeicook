import React,  { useEffect } from 'react'
import HomePageNavItems from './HomePageNavItems'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl'
import Boards from './Sections/BoardsTools/Boards'
import Workspaces from './Sections/Workspaces/Workspaces'


export default function HomePage() {

  return (
<>
<LoggedInUsersControl>
  
  <nav className='nav'>
      <LandingPageToggle innerText="Credits: 0" pageLink="/register"/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
        {<HomePageNavItems/>}     
      </ul>
  </nav>  

  <main className='home-main-cont'>
    <h2>Select tool that matches the action you want to execute:</h2>
    <Boards/>
    <Workspaces/>
  </main>

</LoggedInUsersControl>  
</>
  )
}
