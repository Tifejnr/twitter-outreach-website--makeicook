import React, {useEffect, useState} from 'react'
import accountIcon from "../../../assets/SVGs/account.svg"
import logoutIcon from "../../../assets/SVGs/logout.svg"
import trial from '../../../JS functions/Auth/trail';

export default function DashBody() {
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [credits, setCredits] = useState(5);
  const [creditsExpiration, setCreditsExpiration] = useState("Never");

  

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
            <article className="name"><h2>{username}</h2></article>
            <article className="email"><p>{email}</p></article>
            <table>
              <tbody>
                <tr>
                  <td>Credits</td>
                  <td className="value upLink">{credits}</td>
                </tr>
                <tr>
                  <td>Credits Expiration</td>
                  <td className="value jobsPiadFor">{creditsExpiration}</td>
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

   <section class="logoutContainer" onClick={async (e)=> {
    e.preventDefault(
    await  trial()
    )
   }}>
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
