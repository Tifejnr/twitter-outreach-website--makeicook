import React from 'react'
import CustomLink from '../../../CustomLink'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'
import { pagesLinkObj } from '../../../utilis/pageLinks/pagesLinkObj'

// const reviewsPageLink= "/reviews"
// const pricingPageLink= "/pricing"

export default function ResourcesSection() {
  return (
  <>
    <section>
       <h3>Resources</h3>
       <ul>
    <CustomLink to={pagesLinkObj.blogPageLink}
      onClick={(e) => {
        e.preventDefault();
        handlePageRefreshOnLoad(pagesLinkObj.blogPageLink);
      }}>
      <p>Blog</p>
    </CustomLink>

    <CustomLink to={pagesLinkObj.tutorialsPageLink}
      onClick={(e) => {
        e.preventDefault();
        handlePageRefreshOnLoad(pagesLinkObj.tutorialsPageLink);
      }}>
      <p>Tools Tutorial</p>
    </CustomLink>

        {/* <li>< Link   htmlFor={reviewsPageLink}><p>Reviews</p></ Link  ></li>
        <li>< Link   htmlFor={pricingPageLink}><p>Pricing</p></ Link  ></li>
        <li>< Link   htmlFor=""></ Link  ></li> */}
       </ul>
   </section>
  </>
  )
}
