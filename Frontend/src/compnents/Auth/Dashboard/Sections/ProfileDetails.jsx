import React from "react";
import accountIcon from "../../../../assets/SVGs/account.svg"

export default function ProfileDetails(props) {

  const propObj = props.dashboardObj;
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
            <h2>{propObj.name}</h2>
          </article>
          <article className="email">
            <p>{propObj.email}</p>
          </article>
          <table>
            <tbody>
              <tr>
                <td>Credits</td>
                <td className="value">{propObj.credits}</td>
              </tr>
              <tr>
                <td>Expiration</td>
                <td className="value">No expiration</td>
              </tr>

              <tr>
                <td>Current Plan</td>
                <td className="value">{propObj.plan}</td>
              </tr>
              <tr>
                <td>Authorized</td>
                <td className="value">{"Yes"}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
}
