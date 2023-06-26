import React from 'react'

import NavItemsLandingPage from './NavItems'



export default function NavBarLandingPage() {
  return (
   <nav className='nav'>

    <a href='/' className='site-title'>Site Name</a>

    <NavItemsLandingPage/>

     <a to='/try-for-free'>Try for Free</a> 

   </nav>  
  )
}


