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
          <CustomLink to={toolsPageLink}
              onClick={(e) => {
                  e.preventDefault()
                handlePageRefreshOnLoad(toolsPageLink)
                }}
              >
              <p>Tools</p>
          </CustomLink>

          <CustomLink to={faqPageLink}
            onClick={(e) => {
                e.preventDefault()
                handlePageRefreshOnLoad(faqPageLink)
                }}
            >            
              <p>FAQ</p>
          </CustomLink>

          <CustomLink to={reviewsPageLink}
            onClick={(e) => {
                e.preventDefault()
              handlePageRefreshOnLoad(reviewsPageLink)
              }}
            >
            <p>Reviews</p>
          </CustomLink>

          <CustomLink to={pricingPageLink}  onClick={(e) => {
                e.preventDefault()
              handlePageRefreshOnLoad(pricingPageLink)
              }}>
              <p>Pricing</p>
          </CustomLink>
          
          {/* <CustomLink to=""></CustomLink> */}
       </ul>
   </section>
   
   </>
  )
}
