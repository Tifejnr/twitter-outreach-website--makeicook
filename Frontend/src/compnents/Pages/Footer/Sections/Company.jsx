import React from 'react'
import CustomLink from '../../../CustomLink'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'
import { pagesLinkObj } from '../../../utilis/pageLinks/pagesLinkObj'

export default function Company() {
  return (
    <section>
       <h3>Company</h3>
       <ul>
          <CustomLink to={pagesLinkObj.aboutPageLink}
            onClick={(e) => {
                e.preventDefault()
                handlePageRefreshOnLoad(pagesLinkObj.aboutPageLink)
             }}
              >
            <p>About us</p>
          </CustomLink>
          
          <CustomLink to={pagesLinkObj.contactPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.contactPageLink);
            }}>
            <p>Contact us</p>
          </CustomLink>

          <CustomLink to={pagesLinkObj.mediaPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.mediaPageLink);
            }}>
            <p>Media</p>
          </CustomLink>

          <CustomLink to={pagesLinkObj.termsPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.termsPageLink);
            }}>
            <p>Terms</p>
          </CustomLink>

          <CustomLink to={pagesLinkObj.privacyPolicyPageLink}
            onClick={(e) => {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.privacyPolicyPageLink);
            }}>
            <p>Privacy Policy</p>
          </CustomLink>

       </ul>
   </section>
  )
}
