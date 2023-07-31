import React from 'react'
import { Link } from 'react-router-dom'
import CustomLink from '../../../CustomLink'

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
        <li>< Link   htmlFor={toolsPageLink}><p>Tools</p></ Link  ></li>
        <li>< Link   htmlFor={faqPageLink}><p>FAQ</p></ Link  ></li>
        <li>< Link   htmlFor={reviewsPageLink}><p>Reviews</p></ Link  ></li>
        <li>< Link   htmlFor={pricingPageLink}><p>Pricing</p></ Link  ></li>
        <li>< Link   htmlFor=""></ Link  ></li>
       </ul>
   </section>
   
   </>
  )
}
