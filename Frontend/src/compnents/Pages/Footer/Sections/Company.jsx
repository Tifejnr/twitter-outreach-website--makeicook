import React from 'react'
import CustomLink from '../../../CustomLink'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'

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
          <CustomLink to={aboutPageLink}
            onClick={(e) => {
                e.preventDefault()
                handlePageRefreshOnLoad(aboutPageLink)
             }}
              >
            <p>About us</p>
          </CustomLink>
          
          <CustomLink to={contactPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(contactPageLink);
            }}>
            <p>Contact us</p>
          </CustomLink>

          <CustomLink to={mediaPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(mediaPageLink);
            }}>
            <p>Media</p>
          </CustomLink>

          <CustomLink to={termsPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(termsPageLink);
            }}>
            <p>Terms</p>
          </CustomLink>

          <CustomLink to={privacyPolicyPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(privacyPolicyPageLink);
            }}>
            <p>Privacy Policy</p>
          </CustomLink>

       </ul>
   </section>
  )
}
