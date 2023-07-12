import React from 'react'

export default function GetStartedIcon() {
  return (
    <>
     <a onClick={async (e)=> {
          e.preventDefault()
         await  trelloAuthRedirect();
        }} 
        
        className='oauth-button'>
          <section>
          <img src= {trelloIcon} className='trello-icon' />
          <h2>Get Started with Trello</h2>
          </section>
        </a>
    </>
  )
}
