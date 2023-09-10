import React from 'react'
import { Link } from 'react-router-dom'

export default function Workspaces() {
  return (
   <section className='boards-actions-section workspace-section'>

    <h2>Workspaces</h2>

     <ul>
        <Link>
          <li>
              <p>Add team members to workspaces tool</p>
          </li>
        </Link>
        <Link>
          <li>
              <p>Remove team members from workspaces tool</p>
          </li>
        </Link>
     </ul>

   </section>
  )
}
