import React from "react";
import CustomLink from "../../CustomLink";

export default function NavItemsDashBoard() {
  return (
    <>
      <li className="nav-list">
        <h3 className="tools">Tutorials</h3>
      </li>

      <li className="nav-list">
        <h3 className="faq">Tools</h3>
      </li>

      <li className="nav-list">
        <h3 className="pricing">Credit Usage</h3>
      </li>

      <CustomLink to="/register" className="sign-up-cont">
        <h4 className="sign-up">Credits: 500</h4>
      </CustomLink>

      <CustomLink to="/pricing">
        <button className="buy-btn-nav">Buy Credits</button>
      </CustomLink>
    </>
  );
}
