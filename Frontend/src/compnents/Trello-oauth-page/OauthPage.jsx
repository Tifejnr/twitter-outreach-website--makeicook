import NavToggleIcon from "../Main-nav-bar/NavToggleIcon"
import NavLogo from "../Main-nav-bar/NavLogo"
import OauthNavItems from "./OauthNavItems"
import GetStartedIcon from "./GetStartedIcon"
import trelloIcon from "../../assets/SVGs/trello-icon.svg"
import forwardArrowIcon from "../../assets/SVGs/forward-arrow.svg"



export default function OauthPage() {
  return (
   <>
  <nav className='nav'>
       
       <NavToggleIcon/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
         <OauthNavItems/>
      </ul>
  </nav> 

  <main className="auth-page-main-cont">
       <h1>AUTHORIZE ACCESS</h1>

       <section className="authorize-image-desc">
        <article>
           <img src= {trelloIcon} className='trello-icon' />
            <h3>Trello</h3>
        </article>

        <picture>
            <img src= {forwardArrowIcon} className='forward-arrow-icon' />
        </picture>

        <picture>
          <NavLogo/>
        </picture>

       </section>

       <section>
        <p>
         Before we can let you dive in, please click the button below to connect Collab for Trello with Trello. 
         We only read data from the boards you select. 
         We don't change anything in your Trello account and we won't store any of your credentials.
        </p>
       </section>

       <section>
         <GetStartedIcon/>
       </section>

  </main> 
   </>
  )
}
