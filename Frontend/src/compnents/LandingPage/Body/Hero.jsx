import React from 'react'
import trelloIcon from "../../../assets/trello-icon.svg"
const oauthUrl= "https://collabfortrello.com/authorize"

export default function Hero() {
  return (

    <section className='hero-container'> 
      <h1>Add Trello Member to Multiple Boards at Once</h1>
      <h3>Saves time that can be utilized for more productive activities</h3>

        <a href={oauthUrl} className='oauth-button'>
          <section>
          <img src= {trelloIcon} className='trello-icon' />
          <h2>Continue with Trello</h2>
          </section>
        </a>
    </section>
  )
}
