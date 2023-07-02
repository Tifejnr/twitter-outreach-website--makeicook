import React from 'react'

export default function SignIn() {
  return (

 <section class="main-container reg-container" id="form">
      <article class="main__title">
        <h2>Register Now</h2>
      </article>

      <form action="" class="reg-form">
        <label class="label" for="nameId">Full Name</label>
        <div class="input-wrapper">
          <input
            name="name"
            type="text"
            placeholder="First Name        Last Name"
            id="nameId"
            autofocus="autofocus" />
          <div class="error"></div>
        </div>
        <label class="label" for="emailId">Email</label>
        <div class="input-wrapper">
          <input
            name="email"
            type="email"
            placeholder="Enter an email you can access please"
            id="emailId"
            autocomplete="off" />
          <div class="error" id="emailError"></div>
        </div>
        <label class="label" for="passwordId">Password</label>
        <div class="input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password must be at least 4 characters"
            id="passwordId" />
          <div class="error"></div>
        </div>

        <label class="label" for="entryCodeId">Entry Code</label>
        <div class="input-wrapper">
          <input type="text" id="entryCodeId" placeholder="Entry Code" />
          <div class="error" id="entryCodeError"></div>
        </div>

        <h3 class="policy-agreement-text">
          By Registering, I agree to Work for Reputation's
          <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
        </h3>

        <button id="create_btn" class="submit-btn">Register</button>
      </form>

      <aside class="prompt-message">
        <h3>Already have an account? <a href="/login">Login </a></h3>
      </aside>
    </section>
  )
}
