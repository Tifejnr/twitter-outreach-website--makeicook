import React , {useContext} from 'react'
import { Link, useMatch, useResolvedPath,Navigate, Route, Routes} from "react-router-dom"

export default function NavItemsLandingPage() {
  return (
      <>
      <li className="nav-list">
         <h3 className="features">Features</h3>
      </li>

        <li className="nav-list">
          <h3 className="pricing">Pricing</h3>
        </li>

        <li className="nav-list">
         <h3 className="faq">FAQ</h3>
        </li>

        <li className="nav-list">
            <h3 className="reviews">Reviews</h3>
        </li>

        <li className="nav-list">
         <h3 className="sign-up">Log In</h3> 
        </li>

        <li className="nav-list">
        <h3 className="sign-up">Start for free</h3> 
        </li>
</>
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


