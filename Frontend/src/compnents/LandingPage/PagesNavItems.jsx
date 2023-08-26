import React from 'react'
import CustomLink from '../CustomLink'
import handlePageRefreshOnLoad from '../utilis/refreshPageOnLoad'


const registerPageLink ="/register"
const signInPageLink ="/sign-in"
const pricingLink = "/pricing"
const toolsLink ="/tools"
const faqLink ="/faq"
const reviewsLink ="/reviews"

export default function PagesNavItems(props) {

 return (
    <>
      <li>
        <ul className='inner-nav-item-container'>
          <CustomLink className="nav-list" to={toolsLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(toolsLink)
            }}>
             <h3 className="tools">Tools</h3>
          </CustomLink>

          <CustomLink className="nav-list" to={pricingLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pricingLink)
            }}>

              <h3 className="pricing">Pricing</h3>
          </CustomLink>

            <CustomLink className="nav-list" to={faqLink} onClick={(e)=> {

              e.preventDefault();
              handlePageRefreshOnLoad(faqLink)
            }}>
             <h3 className="faq">FAQ</h3>
            </CustomLink>

            <CustomLink className="nav-list" to={reviewsLink} onClick={(e)=> {

              e.preventDefault();
              handlePageRefreshOnLoad(reviewsLink)
            }}>
                <h3 className="reviews">Reviews</h3>
            </CustomLink>
        </ul>
      </li>

        <li>
          <ul className='inner-nav-item-container'>
            <CustomLink to={signInPageLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(signInPageLink)
            }}>
             <h3 id="loginLandingPage">Log In</h3>
            </CustomLink>
            
            <CustomLink to={registerPageLink} className="sign-up-cont" onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(registerPageLink)
            }}>
            <h4 className='sign-up'>Start for free</h4>
            </CustomLink>
          </ul>
        </li>
   </>
)
}
