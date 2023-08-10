import React from 'react'
import {Link } from 'react-router-dom'
import CustomLink from '../../../CustomLink'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'

const toolsPageLink= "/tools"
const faqPageLink= "/faq"
const reviewsPageLink= "/reviews"
const pricingPageLink= "/pricing"

export default function ProductDetails() {

  return (
   <>
   <section>
       <h3>Product</h3>
       <ul>
          <li><CustomLink to={toolsPageLink}><p>Tools</p></CustomLink></li>
          <li><CustomLink to={faqPageLink}><p>FAQ</p></CustomLink></li>
          <li><CustomLink to={reviewsPageLink}><p>Reviews</p></CustomLink></li>
          <li>
              <CustomLink to={pricingPageLink}  onClick={(e) => {
                e.preventDefault()
              handlePageRefreshOnLoad(pricingPageLink)
              }}>
              <p>Pricing</p>
              </CustomLink>
          </li>
          {/* <li><CustomLink to=""></CustomLink></li> */}
       </ul>
   </section>
   
   </>
  )
}
