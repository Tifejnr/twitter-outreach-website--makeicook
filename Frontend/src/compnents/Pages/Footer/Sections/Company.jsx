import React from 'react'
import { Link } from 'react-router-dom'

const aboutPageLink= "/about"
const contactPageLink= "/contact-us"
const mediaPageLink= "/media"
const privacyPolicyPageLink= "/privacy-policy"
const termsPageLink= "/terms"

export default function Company() {
  return (
    <section>
       <h3>Company</h3>
       <ul>
        <li>< Link   to={aboutPageLink}><p>About us</p></ Link  ></li>
        <li>< Link   to={contactPageLink}><p>Contact us</p></ Link  ></li>
        <li>< Link   to={mediaPageLink}><p>Media</p></ Link  ></li>
        <li>< Link   to={termsPageLink}><p>Terms</p></ Link  ></li>
        <li>< Link   to={privacyPolicyPageLink}> <p>Privacy Policy</p> </ Link  ></li>
       </ul>
   </section>
  )
}
