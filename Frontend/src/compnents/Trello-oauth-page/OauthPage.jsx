import NavToggleIcon from "../Main-nav-bar/NavToggleIcon"
import NavLogo from "../Main-nav-bar/NavLogo"
import OauthNavItems from "./OauthNavItems"
import GetStartedIcon from "./GetStartedIcon"
import trelloIcon from "../../assets/SVGs/trello-icon.svg"
import forwardArrow from "../../assets/SVGs/thin-long-arrow-right-icon.svg"
import LoggedInUsersControl from "../Controllers/LoggedInUsersControl"



export default function OauthPage() {
  return (
   <>
 <LoggedInUsersControl>
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

          <picture id="linking-arrow-cont" >
              <img src={forwardArrow} alt="" />
          </picture>

          <picture>
            <NavLogo/>
          </picture>

       </section>

       <section>
        <p>
         Before we can let you dive in, please click the button below to connect Collab for Trello with Trello in order to perform automations on your behalf. 
        </p>
       </section>

       <section>
         <GetStartedIcon/>
       </section>

  </main> 
</LoggedInUsersControl>  
   </>
  )
}
