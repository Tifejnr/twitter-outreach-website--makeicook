import React from "react";
import AuthNav from "../AuthNav";
import { changeTabTitle } from "../../utilis/changeTabTitle";
import GetStartedIcon from "../../Trello-oauth-page/GetStartedIcon";

const logInTabTitle= "Log in – Collab for Trello"
const signinButtonLabel= "Sign in with Trello"

export default function SignIn() {
  changeTabTitle(logInTabTitle)

  return (     
<>
  <AuthNav/>

  <section className="main-container reg-container" id="form">

      <article className="main__title">
          <h2>Sign In</h2>
      </article>

      <GetStartedIcon buttonLabel={signinButtonLabel}/>
      
  </section>
</>
 );
}




