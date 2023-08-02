import React from 'react'
import addToBoardEmailImage from "../../../assets/Images/add-by-email-trello-pic.png"
import completedAddByEmail from "../../../assets/Images/completd-mail-addition-trello'.png"
import arrowIcon from "../../../assets/SVGs/thin-long-arrow-right-icon.svg"

export default function ToolBlueprint(props) {
  return (
 <section className='each-tool-section'>
        <h2><span>{props.indexNo+1}.</span> {props.toolDetails.heading}</h2>

        <article>
            <p>Overview</p>
            <p>{props.toolDetails.overview}</p>
        </article>

        <article>
            <section>
                <p>How it works</p>
                <p>{props.toolDetails.howItWorks}</p>
            </section>

            <picture>
            <div><img src={addToBoardEmailImage} alt="add to board by email ui photo" /></div>
            <div><img src={arrowIcon} alt="arrow pointing icon" /></div>
            <div><img src={completedAddByEmail} alt="add to board completed photo" /></div>
            </picture>
        </article>

       <article>
         <p>To use this tool, you must have one of these details about the member :</p>

        <ul>
            {props.toolDetails.email && <li>Email</li>}   
            {props.toolDetails.username && <li>Username</li>}   
            {props.toolDetails.name && <li>Full name - <b>Note:</b> Member must be on one of your boards already to use their Full name.</li>}   
        
        </ul>
        
       </article>

       <article>

        <p>Credits needed to use this tool :</p>
        <p><b>1</b> Credit</p>

       </article>
        
    </section>
  )
}
