import React from 'react'
import FeatureBlueprint from './Blueprint'
import { addToBoardsFeatureDetails } from './EachFeature/AddToBoards'

export default function Features() {
  return (
    <div>
        <FeatureBlueprint featureDetails={addToBoardsFeatureDetails}/>
    </div>
  )
}
