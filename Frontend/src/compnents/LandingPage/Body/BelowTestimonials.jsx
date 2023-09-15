import React from 'react'
import { Link } from 'react-router-dom';
import handlePageRefreshOnLoad from '../../utilis/refreshPageOnLoad';
import { pagesLinkObj } from '../../utilis/pageLinks/pagesLinkObj';


export default function BelowTestimonials() {
  return (
    <section className='hero-container below-testimonial-cont'> 
     <div className='hero-inner-container'>
      <h2>Ready to try out Collab for Trello?</h2>
       <h3>Eliminate manual addition and removal of members from boards and workspaces</h3>

        <section className='call-to-action-cont'>
          <Link  to={pagesLinkObj.registerPageLink} className='oauth-button' onClick={(e)=> {
            e.preventDefault()
            handlePageRefreshOnLoad(pagesLinkObj.registerPageLink)
             }}>
              <h2>Start for free</h2>
          </Link>
            <ul>
              <li><p> 5 free credits for trial</p></li>
              <li> <p>No credit card required</p> </li>
          </ul>
        </section>
      </div>
    </section>
  )
}
