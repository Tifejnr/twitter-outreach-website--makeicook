import React from 'react'
import FeatureBlueprint from './Tool-Blueprint'
import { addToBoardsFeatureDetails } from './EachTool/AddToBoards'

export default function ToolsSection() {
  return (
    <section className='tools-section-cont'>
        <header>
           <h2>Tools</h2>
        </header>
        <FeatureBlueprint featureDetails={addToBoardsFeatureDetails}/>
    </section>
  )
}
