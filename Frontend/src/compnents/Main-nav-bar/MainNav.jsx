import React,  { useState, useEffect } from 'react'
import NavItemsLandingPage from '../LandingPage/NavItems'
import HomePageNavItems from '../Home-nav-items/HomePageNavItems'
import Hero from '../LandingPage/Body/Hero'
import NavToggleIcon from './NavToggleIcon'
import NavLogo from './NavLogo'
import getCookie from '../../JS functions/Auth/cookie-handling/get-cookie'
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in'



export default function MainNav() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);

useEffect(() => {
  (async function ()  {

  if (await isUserLoggedIn())

     setIsLoggedIn(prevState=>!prevState);
  }

  ())

  }, []);


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



