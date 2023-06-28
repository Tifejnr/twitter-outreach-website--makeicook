import React from 'react'

import NavItemsLandingPage from './NavItems'



export default function NavBarLandingPage() {
  return (

     <nav class="nav" id="nav-bar">
      <input type="checkbox" id="nav__checkbox" class="nav__checkbox" />
      <section class="mainNavIcons">
        <article class="myProfileIcon">
          <a href="/userDashboard">
            <picture class="cartIcon userAccountIcon" title="My Profile">
              <img src="/images/account.svg" alt="" />
            </picture>
          </a>
        </article>

        <label for="nav__checkbox" class="nav__toggle" title="Menu">
          <svg class="menu" viewBox="0 0 448 512" width="100" title="bars">
            <path
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
          <svg class="close" viewBox="0 0 384 512" width="100" title="times">
            <path
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
          </svg>
        </label>
      </section>

      <ul class="nav__menu">
        <li>
          <section class="logo-container">
            <section class="logoIconsContainer">
              <picture>
                <img src="./assets/letter-G.svg" alt="" />
              </picture>
              <picture class="letter-l">
                <img src="./assets/letter-l.svg" alt="" />
              </picture>
            </section>
            <h2 class="logo-title">Goals Logic</h2>
          </section>
        </li>

        <li class="nav-list">
          <h3 class="makeRequest">Pricing</h3>
        </li>
        <li class="nav-list">
          <h3 class="rules">FAQ</h3>
        </li>
        <li class="nav-list">
          <h3 class="faq">Reviews</h3>
        </li>

        <li class="nav-list">
          <a href="/userDashboard" class="userDashBoardLarge">
            <picture class="cartIcon userAccountIcon" title="My Profile">
              <img src="/images/account.svg" alt="" />
            </picture>
          </a>
        </li>
      </ul>
    </nav>
   
  )
}


{/* <nav className='nav'>

    <a href='/' className='site-title'>Site Name</a>

    <NavItemsLandingPage/>

     <a to='/try-for-free'>Try for Free</a> 

   </nav>   */}


