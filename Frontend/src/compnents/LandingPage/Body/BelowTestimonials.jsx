import React from 'react'
import trelloIcon from "../../../assets/SVGs/trello-icon.svg"
const oauthUrl= "https://collabfortrello.com/authorize"

export default function BelowTestimonials() {
  return (
    <section className='hero-container below-testimonial-cont'> 
     <div className='hero-inner-container'>
      <h1>Add Trello Member to Multiple Boards at Once</h1>

        <a href={oauthUrl} className='oauth-button'>
          <section>
          <img src= {trelloIcon} className='trello-icon' />
          <h2>Get Started with Trello</h2>
          </section>
        </a>

        <ul>
            <li>No credit card needed</li>
            <li>5 free Credits to Add on 5 occasions every month</li>
            <li></li>
            <li></li>
        </ul>
      </div>
    </section>
  )
}
