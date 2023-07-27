import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import accountIcon from "../../../assets/SVGs/account.svg";
import logoutIcon from "../../../assets/SVGs/logout.svg";
import trial from "../../../JS functions/Auth/trail";
import ChangePassword from "./Sections/ChangePassword";
import ProfileDetails from "./Sections/ProfileDetails";

export default function DashBody() {
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [credits, setCredits] = useState(5);
  const [creditsExpiration, setCreditsExpiration] = useState("Never");

  return (
    <>
      <main className="dashboard-container">
       <ProfileDetails/>
        <ChangePassword />
      </main>

 
   
    </>
  );
}
