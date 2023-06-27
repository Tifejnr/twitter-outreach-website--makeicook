import React from 'react'
import trelloIcon from "../../../assets/trello-icon.svg"

export default function Hero() {
  return (
   <section className='hero-container'>
    <h1>Add Member to Multiple Boards on Trello!</h1>

    <h3>All-in-one tool for addition and removal of members on Trello</h3>

    <a href="" className='oauth-button'>
      <section>
       <  img src= {trelloIcon} className='trello-icon' />
       <h2>Continue with Trello</h2>
      </section>
    </a>
   </section>
  )
}
