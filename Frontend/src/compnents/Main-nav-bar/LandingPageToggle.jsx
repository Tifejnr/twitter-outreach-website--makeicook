import React from 'react'
import { Link } from 'react-router-dom'
import ToggleLabel from './ToggleLabel'

export default function LandingPageToggle(props) {

  return (
    <>
     <input type="checkbox" id="nav__checkbox" className="nav__checkbox" />
      <section className="mainNavIcons">
            <article className="myProfileIcon"> 
            
              <Link to={props.pageLink} >   
                    <button id="start-for-free-mobile-lp">
                      <p>{props.innerText}</p>
                    </button>
              </Link>

            </article>

            <ToggleLabel/>
      </section>
   </>
  )
}
