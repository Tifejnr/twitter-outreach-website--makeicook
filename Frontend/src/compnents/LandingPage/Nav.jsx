import React from 'react'

import NavItems from './NavItems'

export default function NavBar() {
  return (
   <>
   <nav className='nav'>

    <a href='/' className='site-title'>Site Name</a>

    <NavItems/>


   </nav>  
   </>
  )
}
