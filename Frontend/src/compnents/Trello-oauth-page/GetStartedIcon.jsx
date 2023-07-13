import React from 'react'
import trelloIcon from "../../assets/SVGs/trello-icon.svg"
import trelloAuthRedirect from "../../JS functions/Auth/trello-oauth"

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
          <h2> CLICK TO AUTHORIZE </h2>
          </section>
        </a>
    </>
  )
}
