import React from 'react'
import { Link } from 'react-router-dom'

export default function Boards() {
  return (
   <section className='boards-actions-section'>

    <h2>Boards</h2>

     <ul>
        <Link to={"/add-memeber"}>
            <li>
               <p>Add team members to boards tool</p>
            </li>
        </Link>

        <li>
            <Link>
                <p>Delete team members from boards tool</p>
            </Link>
        </li>
     </ul>

   </section>
  )
}
