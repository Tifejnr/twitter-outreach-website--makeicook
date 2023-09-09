import React from 'react'
import addToBoardEmailImage from "../../../assets/Images/add-by-email-trello-pic.png"
import completedAddByEmail from "../../../assets/Images/completd-mail-addition-trello.png"
import arrowIcon from "../../../assets/SVGs/thin-long-arrow-right-icon.svg"

export default function ToolBlueprint(props) {
  return (
 <section className='each-tool-section'>
        <h2><span>{props.indexNo+1}.</span> {props.toolDetails.heading}</h2>

        <article>
            <p></p>
            <p>{props.toolDetails.overview}</p>
        </article>

      
    </section>
  )
}
