import React from 'react'
import BrandLogo from './Sections/BrandLogo'
import ProductDetails from './Sections/ProductDetails'
import ResourcesSection from './Sections/ResourcesSection'
import Company from './Sections/Company'
import SocialMediaIcons from './Sections/SocialMediaIcons'
import CopyrightSection from './Sections/copyrightSection'

export default function FooterPages() {
  return (
    <footer className='pages-footer'>
      <section className="brandIdentityCont">
        <BrandLogo/>
        <section className='brand-identity-options-large-screen'>
          <section className="moto">
            <p>Save time and stress of manually adding and removing trello team members from multiple boards and workspaces</p>
          </section>
        <SocialMediaIcons/>
        
      <CopyrightSection/>
        </section>

        </section>
      <section className='footer-page-links-cont'>
          <ProductDetails/>
          <Company/>
      </section>

      <section className="social-media-icons-cont-footer"><SocialMediaIcons/></section>

      <div className="copyright-section"><CopyrightSection/></div>

    </footer>
  )
}
