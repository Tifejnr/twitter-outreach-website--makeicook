import React from 'react'
import { Link } from 'react-router-dom';
import BelowHero from './BelowHero'
import Testimonials from './Testimonials'
import BelowTestimonials from './BelowTestimonials'

export default function Hero() {
  
  return (
<>
    <section className='hero-container'> 
     <div className='hero-inner-container'>
      <h1>Add Team Member to Multiple Trello Boards at Once</h1>
      <h3>Save time and stress of manually navigating multiple boards, to add a team member.</h3>
       
        <section className='call-to-action-cont'>
          <Link  to="/register" className='oauth-button'>
              <h2>Start for free <span className='floating-arrow'>&#8594;</span> </h2>
          </Link>
          <ul>
            <li><p> 5 free credits for trial</p></li>
            <li> <p>No credit card required</p> </li>       
          </ul>
        </section>
      </div>
    </section>

    <BelowHero/>
    <Testimonials/>
    <BelowTestimonials/>
</>
  )
}
