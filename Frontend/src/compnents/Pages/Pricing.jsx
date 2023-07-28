import React from 'react'
import PricingPage from '../PricingPage/PricingPage'
import LandingPageToggle from '../Main-nav-bar/LandingPageToggle'
import NavLogo from '../Main-nav-bar/NavLogo'
import PagesNavItems from '../Main-nav-bar/PagesNavItems'
import FAQ from '../LandingPage/FAQ/FAQ'


export default function Pricing() {
  return (
    <>
  <nav className='nav'>
       
       <LandingPageToggle innerText="Credist: 0" pageLink="#"/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
      <PagesNavItems/>  
      </ul>
  </nav>

  <section className="main-pricing-section-alone">
    <PricingPage />  

    <FAQ/>
  </section>

    </>
  )
}
