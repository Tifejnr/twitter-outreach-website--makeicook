import React from "react";
import accountIcon from "../../../../assets/SVGs/account.svg"

export default function ProfileDetails() {
  return (
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
            <h2>{"username"}</h2>
          </article>
          <article className="email">
            <p>{"email"}</p>
          </article>
          <table>
            <tbody>
              <tr>
                <td>Credits</td>
                <td className="value">{"credits"}</td>
              </tr>
              <tr>
                <td>Expiration</td>
                <td className="value">{"creditsExpiration"}</td>
              </tr>

              <tr>
                <td>Current Plan</td>
                <td className="value">{"Premium"}</td>
              </tr>
              <tr>
                <td>Expiration</td>
                <td className="value">{"creditsExpiration"}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
}
