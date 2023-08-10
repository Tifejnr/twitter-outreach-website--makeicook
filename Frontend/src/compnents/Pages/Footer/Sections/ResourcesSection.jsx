import React from 'react'
import CustomLink from '../../../CustomLink'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'

const blogPageLink= "/blog"
const tutorialsPageLink= "/tutorials"
const reviewsPageLink= "/reviews"
const pricingPageLink= "/pricing"

export default function ResourcesSection() {
  return (
  <>
    <section>
       <h3>Resources</h3>
       <ul>
    <CustomLink to={blogPageLink}
      onClick={(e) => {
        e.preventDefault();
        handlePageRefreshOnLoad(blogPageLink);
      }}>
      <p>Blog</p>
    </CustomLink>

    <CustomLink to={tutorialsPageLink}
      onClick={(e) => {
        e.preventDefault();
        handlePageRefreshOnLoad(tutorialsPageLink);
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
