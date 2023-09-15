import React from 'react'
import {Link } from 'react-router-dom'
import CustomLink from '../../../CustomLink'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'
import { pagesLinkObj } from '../../../utilis/pageLinks/pagesLinkObj'


export default function ProductDetails() {

  return (
   <>
   <section>
       <h3>Product</h3>

       <ul>
          <CustomLink to={pagesLinkObj.toolsLink}
              onClick={(e) => {
                  e.preventDefault()
                handlePageRefreshOnLoad(pagesLinkObj.toolsLink)
                }}
              >
              <p>Tools</p>
          </CustomLink>

          <CustomLink to={pagesLinkObj.faqPageLink}
            onClick={(e) => {
                e.preventDefault()
                handlePageRefreshOnLoad(pagesLinkObj.faqPageLink)
                }}
            >            
              <p>FAQ</p>
          </CustomLink>

          <CustomLink to={pagesLinkObj.reviewsLink}
            onClick={(e) => {
                e.preventDefault()
              handlePageRefreshOnLoad(pagesLinkObj.reviewsLink)
              }}
            >
            <p>Reviews</p>
          </CustomLink>

          <CustomLink to={pagesLinkObj.pricingLink}  onClick={(e) => {
                e.preventDefault()
              handlePageRefreshOnLoad(pagesLinkObj.pricingLink)
              }}>
              <p>Pricing</p>
          </CustomLink>
          
          {/* <CustomLink to=""></CustomLink> */}
       </ul>
   </section>
   
   </>
  )
}
