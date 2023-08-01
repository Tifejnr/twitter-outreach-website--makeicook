import React from 'react'
import { Link } from 'react-router-dom'
import toggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg"

export default function ToolsDropdown() {
  return (
      <li className='tools-dropdown'>
              <Link to="#">Tools <img src={toggleIcon} alt="toggle-icon" /></Link>
              <ul className="dropdown-content">
                <li><Link to="/add-member">Add to boards</Link></li>
                <li><Link to="#">Remove from boards</Link></li>
                <li><Link to="#">Add to workspaces</Link></li>
                <li><Link to="#">Remove from workspaces</Link></li>
              </ul>
       </li>
  )
}
