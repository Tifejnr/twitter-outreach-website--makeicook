import React,  { useState, useEffect } from 'react'
import NavItemsLandingPage from '../LandingPage/NavItems'
import HomePageNavItems from '../Home-nav-items/HomePageNavItems'
import Hero from '../LandingPage/Body/Hero'
import NavToggleIcon from './NavToggleIcon'
import NavLogo from './NavLogo'
import getCookie from '../../JS functions/Auth/cookie-handling/get-cookie'



export default function MainNav() {
  const [isLoggedIn, setIsLoggedIn]= useState(false)

   useEffect(() => {

    if (getCookie()) {

      console.log(getCookie())
    setIsLoggedIn(prevState=>!prevState);
    }



     const cookies = document.cookie.split(';');
    const parsedCookies = {};

    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      parsedCookies[name.trim()] = decodeURIComponent(value);
    });

    console.log(parsedCookies);
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



