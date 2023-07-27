import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trial from "../../../JS functions/Auth/trail";
import ChangePassword from "./Sections/ChangePassword";
import ProfileDetails from "./Sections/ProfileDetails";
import Logout from "./Sections/Logout";
import BuyCreditsButton from "./Sections/BuyCreditsButton";

export default function DashBody(props) {

  return (
    <>
      <main className="dashboard-container">
       <ProfileDetails/>
        <BuyCreditsButton/>
        <ChangePassword />
      </main>


      < Logout/>
   
    </>
  );
}
