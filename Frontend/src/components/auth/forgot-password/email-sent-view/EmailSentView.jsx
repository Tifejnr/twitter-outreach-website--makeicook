"use client";

import Link from "next/link";
import AuthNav from "../../AuthNav";
import allLinks from "../../utils/links/allLinks";
import "../../styles/auth.css";

export default function EmailSentView() {
  return (
    <>
      <AuthNav />
      <section className="main-container email-sent-container" id="form">
        <article className="main__title email-sent-title">
          <h2>Check your email</h2>
        </article>

        <article className="reset-pass-info">
          <h3>
            <div>An email has been sent to your registered email address.</div>
          </h3>

          <h3>Please follow the instructions to set a new password.</h3>
          <h3>
            The email may take up to 5 minutes to be delivered, please be
            patient.
          </h3>
        </article>

        <Link href={allLinks.forgotPasswordPage}>
          <button id="login_btn" className="submit-btn">
            Back
          </button>
        </Link>
      </section>
    </>
  );
}