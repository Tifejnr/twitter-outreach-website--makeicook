import React,  { useEffect } from 'react'
import HomeNavBar from './HomeNavBar'
import HomePageNavItems from './HomePageNavItems'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import Boards from './Sections/BoardsTools/Boards'
import Workspaces from './Sections/Workspaces/Workspaces'


export default function HomePage() {

  return (
<>
  <HomeNavBar/>

  <main className='home-main-cont'>
    <h2>Select tool that matches the action you want to execute:</h2>
    <Boards/>
    <Workspaces/>
  </main>
</>
  )
}
