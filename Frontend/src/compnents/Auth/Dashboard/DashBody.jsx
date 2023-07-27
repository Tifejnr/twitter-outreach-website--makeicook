import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import accountIcon from "../../../assets/SVGs/account.svg";
import logoutIcon from "../../../assets/SVGs/logout.svg";
import trial from "../../../JS functions/Auth/trail";

export default function DashBody() {
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [credits, setCredits] = useState(5);
  const [creditsExpiration, setCreditsExpiration] = useState("Never");

  return (
    <>
      <main className="dashboard-container">
        <section className="profile">
          <section className="profileBlock">
            <picture className="userAccountIconContainer" title="My Profile">
              <img
                src={accountIcon}
                alt="account icon"
                className="userAccountIcon"
              />
            </picture>

            <section className="profileDetails">
              <article className="name">
                <h2>{username}</h2>
              </article>
              <article className="email">
                <p>{email}</p>
              </article>
              <table>
                <tbody>
                  <tr>
                    <td>Credits</td>
                    <td className="value">{credits}</td>
                  </tr>
                  <tr>
                    <td>Expiration</td>
                    <td className="value">{creditsExpiration}</td>
                  </tr>

                  <tr>
                    <td>Plan</td>
                    <td className="value">{"Premium"}</td>
                  </tr>
                  <tr>
                    <td>Expiration</td>
                    <td className="value">{creditsExpiration}</td>
                  </tr>
                </tbody>
              </table>

              <button>Buy Credits</button>
            </section>
          </section>
        </section>


             <section className="change-password-section">
        <h2>CHANGE ACCOUNT PASSWORD</h2>
        <fieldset className="input-wrapper">
          <label htmlFor="emailId">
            <p>Old Password:</p>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="emailId"
            value={"email"}
            //  onChange={(e)=> setEmail(e.target.value)}
          />
          <p className="error"></p>
        </fieldset>
        <fieldset className="input-wrapper">
          <label htmlFor="passwordId">
            <p>New Password:</p>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="passwordId"
            value={"password"}
            //  onChange={(e)=> setPassword(e.target.value)}
          />
          <p className="error" id="regErrorDisplay"></p>
        </fieldset>
      </section>

      </main>

 
      <section
        className="logoutContainer"
        onClick={async (e) => {
          e.preventDefault(await trial());
        }}>
        <Link htmlFor="/logout" className="logoutLink">
          <picture className="logoutIcon" title="Logout">
            <img src={logoutIcon} alt="logout icon" />
          </picture>
          <h3>Logout</h3>
        </Link>
      </section>
    </>
  );
}
