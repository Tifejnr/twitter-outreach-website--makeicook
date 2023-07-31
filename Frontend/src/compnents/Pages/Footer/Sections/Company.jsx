import React from 'react'
import { Link } from 'react-router-dom'

const aboutPageLink= "/about"
const contactPageLink= "/contact"
const mediaPageLink= "/media"
const privacyPolicyPageLink= "/privacy-policy"
const termsPageLink= "/terms"

export default function Company() {
  return (
    <section>
       <h3>Company</h3>
       <ul>
        <li>< Link   htmlFor={aboutPageLink}><p>About</p></ Link  ></li>
        <li>< Link   htmlFor={contactPageLink}><p>Contact</p></ Link  ></li>
        <li>< Link   htmlFor={mediaPageLink}><p>Media</p></ Link  ></li>
        <li>< Link   htmlFor={termsPageLink}><p>Terms</p></ Link  ></li>
        <li>< Link   htmlFor={privacyPolicyPageLink}> <p>Privacy Policy</p> </ Link  ></li>
       </ul>
   </section>
  )
}
