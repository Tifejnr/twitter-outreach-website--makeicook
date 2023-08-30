import React from 'react'
import { Link } from 'react-router-dom'
import AuthNav from '../../../Auth/AuthNav'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'
const forgotPasswordPageLink = "/forgot-password"


export default function EmailSentPage() {
  return (
    <>
   <AuthNav/>

   <section className="main-container email-sent-container" id="form">
      <article className="main__title email-sent-title">
        <h2>Check Your Email</h2>
      </article>

      <article className="reset-pass-info">
        <h3>
          <div>A password reset email has been sent to your email.</div>
        </h3>

        <h3>Please follow the instructions to set a new password.</h3>
        <h3>
          The email may take up to 5 minutes to be delivered, please be patient.
        </h3>
      </article>

      <Link  to={forgotPasswordPageLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(forgotPasswordPageLink)
          }}>
            
            <button id="login_btn" className="submit-btn">Back</button>
      </Link>
    </section>
    </>
  )
}
