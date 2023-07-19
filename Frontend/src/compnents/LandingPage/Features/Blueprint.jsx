import React from 'react'

export default function FeatureBlueprint(props) {
  return (
 <section>
        <h2>{props.featureDetails.heading}</h2>

        <article>
            <p>Overview</p>
            <p>{props.featureDetails.overview}</p>
        </article>

        <article>
            <section>
                <p>How it works</p>
                <p>{props.featureDetails.howItWorks}</p>
            </section>

            <picture>

            </picture>
        </article>

       <article>
         <p>To use this tool, you must have at least one of these details about the member</p>

        <ul>
            {props.featureDetails.email && <li>Email</li>}   
            {props.featureDetails.username && <li>Username</li>}   
            {props.featureDetails.name && <li>Name - <b>Member must be on one of your boards already to use 'Name'</b></li>}   
        
        </ul>
        
       </article>

       <article>

        <p>Credits needed to use this tool</p>
        <p>1 Credit</p>

       </article>
        
    </section>
  )
}
