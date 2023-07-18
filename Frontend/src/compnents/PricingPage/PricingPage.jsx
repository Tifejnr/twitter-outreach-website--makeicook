import React from 'react'
import { basicPlanObj } from './allPlansInfo'
import BasicCard from './Cards/BasicCard'

export default function PricingPage() {
  return (
   <>
<section>
    <div className="container-fluid">
      <div className="container">
        <div className="row">     
          <BasicCard planObjs={basicPlanObj}/>
        </div>
      </div>
    </div>
  </section>

   </>
  )
}
