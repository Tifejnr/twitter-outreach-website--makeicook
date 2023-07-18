import React from 'react'
import { Link } from 'react-router-dom';

export default function Hero() {
  
  return (
<>
    <section className='hero-container'> 
     <div className='hero-inner-container'>
      <h1>Trello Members Addition and Removal Automation Tools</h1>
      <h3>Save time and stress of manual addition and removal of trello members from boards and workspaces</h3>
       
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
</>
  )
}
