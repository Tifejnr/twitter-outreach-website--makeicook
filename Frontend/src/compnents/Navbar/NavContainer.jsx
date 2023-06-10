import React from 'react'
import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function NavContainer() {
  return (
<nav id="trellohead">

      <button className="back-btn">Menu</button>
      <h1 id="tme">TME</h1>
    {/* <section className='nav-logo'>
      <CustomLink to="/"> <h2>I 8 PDF</h2></CustomLink> 
    </section> */}
    <ul className='nav-items-container'>
           <CustomLink to="/Merge"> <h2>MERGE PDF</h2></CustomLink>

           <CustomLink to="/delete-member"> <h2>Delete Member</h2></CustomLink>

           <CustomLink to="/Compress"> <h2>Compress PDF</h2></CustomLink>

           <CustomLink to="/Convert"> <h2>Convert PDF</h2></CustomLink>

           <CustomLink to="/AllPdf"> <h2>AllPdf PDF</h2></CustomLink>
    </ul> */

</nav>
    
  )
}

  <section id="trellohead">

    </section>


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

