import NavToggleIcon from "../Main-nav-bar/NavToggleIcon"
import NavLogo from "../Main-nav-bar/NavLogo"
import OauthNavItems from "./OauthNavItems"

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
        <picture>
            Trello Icon
        </picture>

        <picture>
           Arrow Icon
        </picture>

        <picture>
           Cbf Icon
        </picture>

       </section>

  </main> 
   </>
  )
}
