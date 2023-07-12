import React from 'react'
import { Link } from 'react-router-dom';

export default function BelowTestimonials() {
  return (
    <section className='hero-container below-testimonial-cont'> 
     <div className='hero-inner-container'>
      <h1>Ready to try out CollabforTrello?</h1>
       <h3>Eliminate manual addition of a team member to multiple Trello boards</h3>

        <section className='call-to-action-cont'>
          <Link  to="/register" className='oauth-button'>
              <h2>Get Started    &#8594; </h2>
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
