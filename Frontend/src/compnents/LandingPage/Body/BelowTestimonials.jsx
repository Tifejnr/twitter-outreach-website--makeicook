import React from 'react'
import trelloIcon from "../../../assets/SVGs/trello-icon.svg"
const oauthUrl= "https://collabfortrello.com/authorize"

export default function BelowTestimonials() {
  return (
    <section className='hero-container below-testimonial-cont'> 
     <div className='hero-inner-container'>
      <h1>Ready to try out CollabforTrello?</h1>
      <h3>Save Stress of Navigating Multiple Trello Boards to Add Team Member with CollabforTrello</h3>

        <a href={oauthUrl} className='oauth-button'>
          <section>
          <img src= {trelloIcon} className='trello-icon' />
          <h2>Get Started with Trello</h2>
          </section>
        </a>

        <ul>
            <li> <p>No credit card required</p> </li>
            <li><p> 5 free credits for trial</p></li>
            
        </ul>
      </div>
    </section>
  )
}
