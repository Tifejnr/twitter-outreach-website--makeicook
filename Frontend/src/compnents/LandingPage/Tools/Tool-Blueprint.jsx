import React from 'react'
import addToBoardEmailImage from "../../../assets/Images/add-by-email-trello-pic.png"
import completedAddByEmail from "../../../assets/Images/completd-mail-addition-trello.png"
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
            <img src={addToBoardEmailImage} alt="add to board by email ui photo" />
            <img className="image-arrow-icon"  src={arrowIcon} alt="" />
            <img src={completedAddByEmail} alt="add to board completed photo" />
            </picture>
        </article>

       <article>
         <p>To use this tool, you must have one of these details about the member :</p>

        <ul className='detailsNeededListCont'>
            {props.toolDetails.email && <li>Email</li>}   
            {props.toolDetails.username && <li>Username - <b>Note:</b> Member must be on one of your boards already to use their Username. </li>}   
            {props.toolDetails.name && <li>Full name - <b>Note:</b> Member must be on one of your boards already to use their Full name.</li>}   
        
        </ul>
        
       </article>

       <article className='creditsNeededCont'>

          <p>Credits needed to use this tool :</p>
          <p><b>1</b> Credit</p>

       </article>
        
    </section>
  )
}
