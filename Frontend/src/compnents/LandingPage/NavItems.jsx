import React from 'react'
import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function NavItemsLandingPage() {
  return (

    <>
      <input type="checkbox" id="nav__checkbox" class="nav__checkbox" />
      <section class="mainNavIcons">
        <article class="myProfileIcon">
              <button>Try Now</button>
          <a href="/userDashboard">
            <picture class="cartIcon userAccountIcon" title="My Profile">
          
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
            {/* <section class="logoIconsContainer">
              <picture>
                <img src="./assets/letter-G.svg" alt="" />
              </picture>
              <picture class="letter-l">
                <img src="./assets/letter-l.svg" alt="" />
              </picture>
            </section> */}
            <h2 class="logo-title">Collab for Trello</h2>
          </section>
        </li>

        <li class="nav-list">
          <CustomLink to="/features"><h3 class="features">Features</h3></CustomLink>
        </li>
        <li class="nav-list">
          <CustomLink to="/pricing"><h3 class="pricing">Pricing</h3></CustomLink>
        </li>
        <li class="nav-list">
          <CustomLink to="/faq"><h3 class="faq">FAQ</h3></CustomLink>
        </li>
        <li class="nav-list">
            <CustomLink to="/reviews"><h3 class="reviews">Reviews</h3></CustomLink>
        </li>

        <li class="nav-list">
          <a href="/userDashboard" class="userDashBoardLarge">
            <picture class="cartIcon userAccountIcon" title="My Profile">
              <button>Try Now</button>
            </picture>
          </a>
        </li>
      </ul>
</>
)
}


//Nav program that is active function
const CustomLink= ({to, children, ...props}) => {
 const resolvedPath = useResolvedPath(to);

 const isActive =  useMatch({path: resolvedPath.pathname, end:true})

 return (
  <li className={isActive && "active"}>
    <Link to={to} {...props}>
      {children}
    </Link>

  </li>
 )
}


