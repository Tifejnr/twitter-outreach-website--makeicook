import React from 'react'
import CustomLink from '../../CustomLink'

export default function NavItemsDashBoard() {
 return (
      <>
      <li className="nav-list" >
         <h3 className="tools">Tools</h3>
      </li>

        <li className="nav-list" >
          <h3 className="pricing">Pricing</h3>
        </li>

        <li className="nav-list" >
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
