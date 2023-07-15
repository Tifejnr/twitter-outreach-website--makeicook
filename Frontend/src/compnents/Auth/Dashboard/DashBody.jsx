import React from 'react'
import accountIcon from "../../../assets/SVGs/account.svg"
import logoutIcon from "../../../assets/SVGs/logout.svg"

export default function DashBody() {
  return (
 <>

 <main>
      <section classNameName="profile">
        <section className="profileBlock">
          <picture className="userAccountIconContainer" title="My Profile"
            ><img
              src={accountIcon}
              alt="account icon"
              className="userAccountIcon" />
          </picture>

          <section className="profileDetails">
            <article className="name"><h2>hahaa</h2></article>
            <article className="email"><p>aanaahh</p></article>
            <table>
              <tbody>
                <tr>
                  <td>UP Link</td>
                  <td className="value upLink">;a;aak</td>
                </tr>
                <tr>
                  <td>Paid For</td>
                  <td className="value jobsPiadFor">akakka</td>
                </tr>
                <tr>
                  <td className="jobRelatedKeyword">Jobs Completed</td>
                  <td className="value">kaka</td>
                </tr>
                <tr>
                  <td className="jobRelatedKeyword">To Be Completed</td>
                  <td className="value">"jaj"</td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </section>
    </main>

   <section class="logoutContainer">
      <a htmlFor="/logout" class="logoutLink">
        <picture class="logoutIcon" title="Logout">
          <img src={logoutIcon} alt="logout icon"
        /></picture>
        <h3>Logout</h3>
      </a>
   </section>
 
 </>
  )
}
