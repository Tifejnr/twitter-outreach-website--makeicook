import React from 'react'
import CustomLink from '../CustomLink'
import { Link } from 'react-router-dom'
import toggleButton from "../../assets/SVGs/faq-toggle-icon.svg"

export default function HomePageNavItems(props) {

 return (
      <>
        <li className='tools-dropdown'>
              <Link to="#">Tools <img src={toggleButton} alt="toggle-icon" /></Link>
              <ul className="dropdown-content">
                <li><Link to="/add-member">Add to boards</Link></li>
                <li><Link to="#">Remove from boards</Link></li>
                <li><Link to="#">Add to workspaces</Link></li>
                <li><Link to="#">Remove from workspaces</Link></li>
              </ul>
       </li>
        <CustomLink className="nav-list">
            <h3 className="creditsUsage">Credits Usage</h3>
        </CustomLink>

       <li  className="sign-up-cont" id="credits-no-large-screen">
         <h4 className="sign-up">{props.showCredits}
         </h4>
      </li>

        <CustomLink to={"/pricing"} className="nav-list" >
          <h3 className="pricing">Buy Credits</h3>
        </CustomLink>
</>
)
}



