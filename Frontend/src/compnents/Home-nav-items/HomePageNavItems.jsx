import React from 'react'
import CustomLink from '../CustomLink'
import { Link } from 'react-router-dom'
import ToolsDropdown from './Sections/ToolsDropdown'

export default function HomePageNavItems(props) {

 return (
      <>
       {props.noTools ? "" : <ToolsDropdown/> }
        
        <CustomLink className="nav-list">
            <h3 className="creditsUsage">Credits Usage</h3>
        </CustomLink>

       <li  className="sign-up-cont" id="credits-no-large-screen">
         <h4 className="sign-up">{props.showCredits}
         </h4>
      </li>

        <CustomLink to={"/pricing"} className="nav-list" >
          <h3 className="buy-credits-nav-home">Buy Credits</h3>
        </CustomLink>
</>
)
}



