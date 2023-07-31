import React from 'react'
import BrandLogo from './Sections/BrandLogo'
import ProductDetails from './Sections/ProductDetails'
import ResourcesSection from './Sections/ResourcesSection'
import Company from './Sections/Company'
import SocialMediaIcons from './Sections/SocialMediaIcons'

export default function FooterPages() {
  return (
    <footer className='pages-footer'>
        <BrandLogo/>
    <section className='footer-page-links-cont'>
        <ProductDetails/>
        <ResourcesSection/>
        <Company/>
    </section>

    <SocialMediaIcons/>

    </footer>
  )
}
