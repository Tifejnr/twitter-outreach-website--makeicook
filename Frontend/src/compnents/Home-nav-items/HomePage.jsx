import React,  { useState, useEffect } from 'react'
import HomePageNavItems from './HomePageNavItems'
import NavToggleIcon from '../Main-nav-bar/NavToggleIcon'
import NavLogo from '../Main-nav-bar/NavLogo'
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in'

export default function HomePage() {
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
       
        {<HomePageNavItems/>}     
      </ul>
  </nav>  

</>
  )
}
