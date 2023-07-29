import React from 'react'
import CustomLink from '../CustomLink'

export default function HomePageNavItems(props) {

 return (
      <>
        <CustomLink to={"/pricing"} className="nav-list" >
          <h3 className="pricing">Pricing</h3>
        </CustomLink>

        <CustomLink className="nav-list">
            <h3 className="reviews">Reviews</h3>
        </CustomLink>

       <li  className="sign-up-cont" id="credits-no-large-screen">
         <h4 className="sign-up">{props.showCredits}
         </h4>
      </li>

        <CustomLink to="/register" >
        <h3 className='sign-upa'>Contact us</h3> 
        </CustomLink>
</>
)
}



