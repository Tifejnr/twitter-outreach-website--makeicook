import React from 'react'
import CustomLink from '../CustomLink'
import { Link } from 'react-router-dom'

export default function HomePageNavItems(props) {

 return (
      <>
        <li className='tools-dropdown'>
              <Link htmlFor="#">Tools</Link>
              <ul className="dropdown-content">
                <li><Link htmlFor="#">Add to boards</Link></li>
                <li><Link htmlFor="#">Remove from boars</Link></li>
                <li><Link htmlFor="#">Add to workspaces</Link></li>
                <li><Link htmlFor="#">Remove from workspaces</Link></li>
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



