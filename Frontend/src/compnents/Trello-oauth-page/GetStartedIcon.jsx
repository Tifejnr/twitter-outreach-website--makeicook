import React from 'react'
import { Link } from 'react-router-dom';
import trelloAuthRedirect from './trello-oauth';
import { IconsObj } from '../utilis/Icons/iconsObj';

export default function GetStartedIcon(props) {
  return (
    <>
     <Link onClick={async (e)=> {
          e.preventDefault()
         await  trelloAuthRedirect();
        }} 
        
        className='oauth-button real-oauth'>
          <section>
          <h2>{props.buttonLabel}</h2>
          <img id='trelloIconForOauth' src={IconsObj.trelloIcon} alt="trello icon" />
          </section>
        </Link>
    </>
  )
}
