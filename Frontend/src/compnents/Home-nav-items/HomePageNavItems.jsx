import React from 'react'
import CustomLink from '../CustomLink'

export default function HomePageNavItems() {


  const dashboardObj= {
    credits:5
  }
 return (
      <>
        <CustomLink to={"/pricing"} className="nav-list" >
          <h3 className="pricing">Pricing</h3>
        </CustomLink>

        <CustomLink className="nav-list">
            <h3 className="reviews">Reviews</h3>
        </CustomLink>

       <li  className="sign-up-cont" id="credits-no-large-screen">
         <h4 className="sign-up">{dashboardObj.credits==1 ? `Credit: ${dashboardObj.credits}` :
       
       `Credits: ${dashboardObj.credits}`}
         </h4>
      </li>

        <CustomLink to="/register" >
        <h3 className='sign-upa'>Contact us</h3> 
        </CustomLink>
</>
)
}



