import React from 'react'
import trelloIcon from "../../../assets/trello-icon.svg"
import BelowHero from './BelowHero'
const oauthUrl= "https://collabfortrello.com/authorize"

export default function Hero() {
  return (
<>
    <section className='hero-container'> 
     <div className='hero-inner-container'>
      <h1>Add Trello Member to Multiple Boards at Once</h1>
      <h3>Saves time that can be utilized on more productive activities</h3>

        <a href={oauthUrl} className='oauth-button'>
          <section>
          <img src= {trelloIcon} className='trello-icon' />
          <h2>Get Started with Trello</h2>
          </section>
        </a>
      </div>
    </section>

    <BelowHero/>
</>
  )
}
