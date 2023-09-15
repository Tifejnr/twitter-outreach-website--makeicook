import React from 'react'
import CustomLink from '../CustomLink'
import handlePageRefreshOnLoad from '../utilis/refreshPageOnLoad'
import { pagesLinkObj } from '../utilis/pageLinks/pagesLinkObj'


export default function PagesNavItems(props) {
 return (
    <>
      <li>
        <ul className='inner-nav-item-container'>
          <CustomLink className="nav-list" to={pagesLinkObj.toolsLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.toolsLink)
            }}>
             <h3 className="tools">Tools</h3>
          </CustomLink>

          <CustomLink className="nav-list" to={pagesLinkObj.pricingLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.pricingLink)
            }}>

              <h3 className="pricing">Pricing</h3>
          </CustomLink>

            <CustomLink className="nav-list" to={pagesLinkObj.faqLink} onClick={(e)=> {

              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.faqLink)
            }}>
             <h3 className="faq">FAQ</h3>
            </CustomLink>

            <CustomLink className="nav-list" to={pagesLinkObj.reviewsLink} onClick={(e)=> {

              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.reviewsLink)
            }}>
                <h3 className="reviews">Reviews</h3>
            </CustomLink>
        </ul>
      </li>

        <li>
          <ul className='inner-nav-item-container'>
            <CustomLink to={pagesLinkObj.signInPageLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.signInPageLink)
            }}>
             <h3 id="loginLandingPage">Log In</h3>
            </CustomLink>
            
            <CustomLink to={pagesLinkObj.registerPageLink} className="sign-up-cont" onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.registerPageLink)
            }}>
            <h4 className='sign-up'>Start for free</h4>
            </CustomLink>
          </ul>
        </li>
   </>
)
}
