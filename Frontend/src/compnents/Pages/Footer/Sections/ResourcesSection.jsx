import React from 'react'
import { Link } from 'react-router-dom'

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
        <li>< Link   to={blogPageLink}><p>Blog</p></ Link  ></li>
        <li>< Link   to={tutorialsPageLink}><p>Tools Tutorial</p></ Link  ></li>
        {/* <li>< Link   htmlFor={reviewsPageLink}><p>Reviews</p></ Link  ></li>
        <li>< Link   htmlFor={pricingPageLink}><p>Pricing</p></ Link  ></li>
        <li>< Link   htmlFor=""></ Link  ></li> */}
       </ul>
   </section>
  </>
  )
}
