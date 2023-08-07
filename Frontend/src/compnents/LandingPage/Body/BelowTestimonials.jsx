import React from 'react'
import { Link } from 'react-router-dom';

export default function BelowTestimonials() {
  return (
    <section className='hero-container below-testimonial-cont'> 
     <div className='hero-inner-container'>
      <h1>Ready to try out Collab for Trello?</h1>
       <h3>Eliminate manual addition and removal of members from boards and workspaces</h3>

        <section className='call-to-action-cont'>
          <Link  to="/register" className='oauth-button'>
              <h2>Start for free  <span className='floating-arrow'>&#8594;</span> </h2>
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
