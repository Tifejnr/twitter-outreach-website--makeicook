import React from "react";
import CustomLink from "../../CustomLink";
import { Link } from "react-router-dom";

export default function NavItemsDashBoard(props) {

  const dashboardObj= props.dashboardObj


  return (
    <>
      <li className="nav-list">
        <h3 className="tools">Tutorials</h3>
      </li>

      <li className="nav-list">
        <h3 className="faq">Tools</h3>
      </li>

      <li className="nav-list">
        <h3 className="pricing">Credits Usage</h3>
      </li>

      <li  className="sign-up-cont" id="credits-no-large-screen">
        <h4 className="sign-up">{dashboardObj.credits==1 ? `Credit: ${dashboardObj.credits}` :
       
       `Credits: ${dashboardObj.credits}`}
       </h4>
      </li>

      <CustomLink to="/pricing" className="buybtn-nav-bar-large-screen">
        <button className="buy-btn-nav">Buy Credits</button>
      </CustomLink>
    </>
  );
}
