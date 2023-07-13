import React , {useContext} from 'react'
import { Link, useMatch, useResolvedPath,Navigate, Route, Routes} from "react-router-dom"
import CustomLink from '../CustomLink'

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

        <CustomLink to="/sign-in">
         <h3 className="login">Log In</h3> 
        </CustomLink>

        <CustomLink to="/register" className="sign-up-cont">
        <h4 className='sign-up'>Start for free</h4> 
        </CustomLink>
</>
)
}



