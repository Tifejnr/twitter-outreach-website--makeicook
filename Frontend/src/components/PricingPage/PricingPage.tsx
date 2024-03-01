import React from 'react'
import BasicCard from './Cards/BasicCard'
import { allPricingPlansObjArray } from './allPlansInfo'

export default function PricingPage() {
  return (
      <>
             <section className="pricing-section">
                  <header>
                    <h2>Pricing</h2>
                    <p>Select plan tailored to your needs below.</p>
                  </header>
                  <section className="pricing-cont">
                    {allPricingPlansObjArray.map((planObj, index) => (
                        <BasicCard key={index} planObjs={planObj} />
                      ))}
                  </section>
            </section>
     </>
  )
}
