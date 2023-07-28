import React from 'react'

export default function Boards() {
  return (
   <section className='boards-actions-section'>

    <h2>Boards</h2>

     <ul>
        <li>
            <Link>
                <p>Add team members to boards tool</p>
            </Link>
        </li>
        
        <li>
            <Link>
                <p>Delete team members from boards tool</p>
            </Link>
        </li>
     </ul>

   </section>
  )
}
