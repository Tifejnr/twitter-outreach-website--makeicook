import React from 'react'

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

            </picture>
        </article>

       <article>
         <p>To use this tool, you must have one of these details about the member :</p>

        <ul>
            {props.toolDetails.email && <li>Email</li>}   
            {props.toolDetails.username && <li>Username</li>}   
            {props.toolDetails.name && <li>Name - <b>Note:</b> Member must be on one of your boards already to use their Name.</li>}   
        
        </ul>
        
       </article>

       <article>

        <p>Credits needed to use this tool :</p>
        <p><b>1</b> Credit</p>

       </article>
        
    </section>
  )
}
