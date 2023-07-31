import React from 'react'
import BrandLogo from './Sections/BrandLogo'
import ProductDetails from './Sections/ProductDetails'
import ResourcesSection from './Sections/ResourcesSection'
import Company from './Sections/Company'

export default function FooterPages() {
  return (
    <footer className='pages-footer'>
    <BrandLogo/>
    <ProductDetails/>
    <ResourcesSection/>

    <Company/>

    </footer>
  )
}
