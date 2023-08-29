import { useState } from "react";
import validateEmailInput from "../../Auth/Auth-Input-Validation/validateEmailInput";

const successColor = "#09c372";
const errorColor = "#ff3860"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailBorderColor, setEmailBorderColor]= useState(null)


  function sendEmailToServer () {
    validateEmailInput(email)
  }

    const emailBorderStyle = {
      borderColor:
      emailBorderColor === null
        ? 'grey'
        : emailBorderColor
        ? successColor
        : errorColor,
  };

    return (
      <section className="main-container forgot-password-container" id="form">
        <article className="main__title">
          <h2>Forgotten Password</h2>
        </article>

        <article className="forgot-pass-info">
          <h3>
            <p>Reset your password by providing your account email below.</p>
          </h3>
        </article>

        <form action="" className="reg-form">
         
          <section className="input-wrapper">
             <label className="label" htmlFor="email"><p>Email</p></label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              id="emailId"
             value={email}
           onChange={(e)=> setEmail(e.target.value)} 
           style={emailBorderStyle}
              autoFocus // No need to use "autofocus='autofocus'" in React
            />
            <section className="error" id="emailError"></section>
          </section>

          <button id="login_btn" className="submit-btn">Continue</button>
        </form>
      </section>
    );
}
