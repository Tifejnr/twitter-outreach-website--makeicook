import React,  { useEffect } from 'react'
import HomePageNavItems from './HomePageNavItems'
import NavToggleIcon from '../Main-nav-bar/NavToggleIcon'
import NavLogo from '../Main-nav-bar/NavLogo'
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl'


export default function HomePage() {

  return (
<>
  
  <nav className='nav'>
       <NavToggleIcon/>

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
