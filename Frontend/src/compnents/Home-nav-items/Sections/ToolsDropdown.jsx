import React from 'react'
import { Link } from 'react-router-dom'
import toggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg"
import handlePageRefreshOnLoad from '../../utilis/refreshPageOnLoad'

const addMemberPageLink= "/add-member"
const removeMemberPageLink= "/delete-member"

export default function ToolsDropdown() {
  return (
      <li className='tools-dropdown'>
              <Link to="#">Tools <img src={toggleIcon} alt="toggle-icon" /></Link>
              <ul className="dropdown-content">
                <li  onClick={(e)=> {
                  handlePageRefreshOnLoad(addMemberPageLink)
                }}>
                <Link to={addMemberPageLink}>Add to boards</Link>
                </li>

                <li onClick={(e)=> {
                    handlePageRefreshOnLoad(removeMemberPageLink)
                  }}>
                    
                  <Link to={removeMemberPageLink} >Remove from boards</Link>

                </li>

                <li><Link to="#">Add to workspaces</Link></li>
                <li><Link to="#">Remove from workspaces</Link></li>
              </ul>
       </li>
  )
}
