import React from 'react'
import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function HomePageNavItems() {
  return (
<>
    <CustomLink to="/add-member"> <h3>Add Member</h3></CustomLink>
    <CustomLink to="/delete-member"> <h3>Delete Member</h3></CustomLink>
    <CustomLink to="/pricing"> <h3>Pricing</h3></CustomLink>

</>
)
}

//Nav program that is active function
const CustomLink= ({to, children, ...props}) => {
 const resolvedPath = useResolvedPath(to);

 const isActive =  useMatch({path: resolvedPath.pathname, end:true})

 return (
  <li className={ 'nav-list' || isActive && "active"}>
    <Link  to={to} {...props}>
      {children}
    </Link>
  </li>
 )
}

