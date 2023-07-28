import React from 'react'
import { Link } from 'react-router-dom'

export default function Boards() {
  return (
<section className='boards-actions-section'>

    <h2>Boards</h2>

     <ul>
        <Link to={"/add-member"}>
            <li>
               <p>Add team members to boards tool</p>
            </li>
        </Link>

        <Link>
          <li>
              <p>Delete team members from boards tool</p>
          </li>
        </Link>
     </ul>

  </section>
  )
}
