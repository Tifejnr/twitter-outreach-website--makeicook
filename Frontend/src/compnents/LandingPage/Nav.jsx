import React from 'react'

import NavItemsLandingPage from './NavItems'

export default function NavBarLandingPage() {
  return (
   <nav className='nav'>

    <a href='/' className='site-title'>Site Name</a>

    <NavItemsLandingPage/>

   </nav>  
  )
}
