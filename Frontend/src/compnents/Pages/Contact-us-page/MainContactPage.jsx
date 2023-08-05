import React from 'react'
import ContactUs from './ContactUs';
import useStore from '../../Hooks/Zustand/usersStore';
import LandingPageToggle from '../../Main-nav-bar/LandingPageToggle';
import PagesNavItems from '../../Main-nav-bar/PagesNavItems';
import NavLogo from '../../Main-nav-bar/NavLogo';

import FooterPages from '../Footer/FooterPages';

export default function MainContactPage() {

    const creditsFromServer = useStore((state) => state.creditsFromServer);
  return (
    <>
  <nav className='nav'>

       <LandingPageToggle pagelink="#" noCredits={true}/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
      <PagesNavItems showCredits={creditsFromServer==1 ? `Credit:${creditsFromServer}`: 
      
      `Credits:${creditsFromServer}`}
      
      />  

      </ul>
  </nav>

 <section className="main-pricing-section-alone">
    <ContactUs/>
  </section>
<FooterPages/>
    </>
  )
}
