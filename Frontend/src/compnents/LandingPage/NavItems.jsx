import React from 'react'
import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function NavItemsLandingPage() {
  return (
    <ul className='nav-items-cont'>
        <CustomLink to="/platforms">Platforms</CustomLink> 
        <CustomLink to="/features">Features</CustomLink> 
        <CustomLink to="/use-cases">Use cases</CustomLink> 
        <CustomLink to='/help'>Help</CustomLink> 
        <CustomLink to='/pricing'>Pricing</CustomLink> 
       
    </ul>
  )
}


//Nav program that is active function
const CustomLink= ({to, children, ...props}) => {
 const resolvedPath = useResolvedPath(to);

 const isActive =  useMatch({path: resolvedPath.pathname, end:true})

 return (
  <li className={isActive && "active"}>
    <Link to={to} {...props}>
      {children}
    </Link>

  </li>
 )
}


