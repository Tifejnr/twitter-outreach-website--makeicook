import React from "react";

export default function ChangePassword() {
  return (
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
          // value={"email"}
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
          // value={"password"}
          //  onChange={(e)=> setPassword(e.target.value)}
        />
        <p className="error" id="regErrorDisplay"></p>
      </fieldset>
    </section>
  );
}
