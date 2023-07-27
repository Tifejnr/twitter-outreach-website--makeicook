import React from "react";

export default function ChangePassword() {
  return (
    <section className="change-password-section">
      <h2>CHANGE ACCOUNT PASSWORD</h2>
      <fieldset className="input-wrapper">
        <label htmlFor="oldPassId">
          <p>Old Password:</p>
        </label>
        <input
          type="password"
          placeholder="Enter your old password"
          id="oldPassId"
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
          placeholder="Enter your new password"
          id="passwordId"
          // value={"password"}
          //  onChange={(e)=> setPassword(e.target.value)}
        />
        <p className="error" id="regErrorDisplay"></p>
      </fieldset>

      <button className="buy-credits-btn change-password-btn">Change Password</button>
    </section>
  );
}
