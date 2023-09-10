import React from 'react'
import trelloAuthRedirect from "./trello-oauth"

export default function GetStartedIcon() {
  return (
    <>
     <a onClick={async (e)=> {
          e.preventDefault()
         await  trelloAuthRedirect();
        }} 
        
        className='oauth-button real-oauth'>
          <section>
          <h2>CLICK TO AUTHORIZE</h2>
          </section>
        </a>
    </>
  )
}
