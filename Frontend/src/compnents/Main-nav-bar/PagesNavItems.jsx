import React from 'react'
import CustomLink from '../CustomLink'

export default function PagesNavItems(props) {

 return (
      <>
      <CustomLink className="nav-list" >
         <h3 className="tools">Tools</h3>
      </CustomLink>

        <CustomLink className="nav-list" >
          <h3 className="pricing">Pricing</h3>
        </CustomLink>

        <CustomLink className="nav-list" >
         <h3 className="faq">FAQ</h3>
        </CustomLink>

        <CustomLink className="nav-list">
            <h3 className="reviews">Reviews</h3>
        </CustomLink>

        <CustomLink to="/register" >
        <h3 className='sign-upa'>Contact us</h3> 
        </CustomLink>
</>
)
}
