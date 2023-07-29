import React from 'react'
import PricingPage from '../PricingPage/PricingPage'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import PagesNavItems from '../Main-nav-bar/PagesNavItems'
import FAQ from '../LandingPage/FAQ/FAQ'
import useStore from '../Hooks/Zustand/usersStore'


export default function Pricing() {
  const creditsFromServer = useStore((state) => state.creditsFromServer);
  return (
    <>
  <nav className='nav'>

       <LandingPageToggle  innerText={creditsFromServer==1 ? `Credit:${creditsFromServer}`: 
      
      `Credits:${creditsFromServer}`} pagelink="#" 
      
      />

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
    <PricingPage />  

    <FAQ/>
  </section>

    </>
  )
}
