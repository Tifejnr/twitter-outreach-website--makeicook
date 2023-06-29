import React from 'react'
import trelloIcon from "../../../assets/SVGs/trello-icon.svg"
import BelowHero from './BelowHero'
import Testimonials from './Testimonials'
import BelowTestimonials from './BelowTestimonials'
const oauthUrl= "https://collabfortrello.com/authorize"

export default function Hero() {
  return (
<>
    <section className='hero-container'> 
     <div className='hero-inner-container'>
      <h1>Add Team Member to Multiple Trello Boards at Once</h1>
      <h3>Save time and stress of manually navigating multiple Trello Boards to add a team member to these boards one by one</h3>

        <a href={oauthUrl} className='oauth-button'>
          <section>
          <img src= {trelloIcon} className='trello-icon' />
          <h2>Get Started with Trello</h2>
          </section>
        </a>
      </div>
    </section>

    <BelowHero/>
    <Testimonials/>
    <BelowTestimonials/>
</>
  )
}
