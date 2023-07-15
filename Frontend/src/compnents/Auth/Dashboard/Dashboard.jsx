import React from 'react'
import goBackIcon from "../../../assets/SVGs/goBack.svg"
import DashBody from './DashBody'
import NavLogo from '../../Main-nav-bar/NavLogo'
import AuthFooter from '../AuthFooter'

export default function Dashboard() {
  return (
    <>
  <nav className='nav'>
       <label for="nav__checkbox" class="nav__toggle">
          <picture className="cartIcon" id="goBackIcon" title="Go Back">
            <img src={goBackIcon} alt="go back icon"
          /></picture>
        </label>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>

      </ul>
  </nav> 

  <DashBody />

  <AuthFooter/>
    </>
  )
}
