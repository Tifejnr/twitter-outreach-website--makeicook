import React from 'react'
import CustomLink from '../CustomLink'

export default function HomePageNavItems(props) {

 return (
      <>

        <CustomLink className="nav-list">
            <h3 className="reviews">Credits Usage</h3>
        </CustomLink>

       <li  className="sign-up-cont" id="credits-no-large-screen">
         <h4 className="sign-up">{props.showCredits}
         </h4>
      </li>

        <CustomLink to={"/pricing"} className="nav-list" >
          <h3 className="pricing">Buy Credits</h3>
        </CustomLink>
</>
)
}



