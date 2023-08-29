import axios from "axios"
import { useState } from "react";
import { websiteUrl } from "../../../JS functions/websiteUrl";
import validateEmailInput from "../../Auth/Auth-Input-Validation/validateEmailInput";


const successColor = "#09c372";
const errorColor = "#ff3860"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [textAreaError, setTextAreaError] = useState("")
  const [emailBorderColor, setEmailBorderColor]= useState(null)


  async function sendEmailToServer (e) {
    e.preventDefault();

  const validateFunctionResponse= validateEmailInput(email);

  if (validateFunctionResponse.emailErrorMessage)  
  return (
     setEmailError(validateFunctionResponse.emailErrorMessage), 
    setEmailBorderColor(false)  )

    setEmailError("");     
    setEmailBorderColor(true);


  const emailValidCheckUrl = `${websiteUrl}/api/forgot-password`;
  try {
    const response = await axios.post(emailValidCheckUrl, {email});
    const data = await response.data;
    console.log(data)
    // if (!data.signedIn) return false;
    // return true;
  } catch (error) {
    // console.log(error.response.data);
    const errorMessage = error.response.data.invalidLoginDetails;
    if (errorMessage) return { errorMessage };
    return false;
  }



  // if (data.emailError)
  //   return setError(emailError, "Provide a valid email address");

  // if (data.notFoundUser) {
  //   return setError(emailError, "Email is not Registered");
  // }

  // if (data.emailSent)
  //   return (window.location.href = "`validateEmailInput`/email-sent");

  }

    const emailBorderStyle = {
      borderColor:
      emailBorderColor === null
        ? 'grey'
        : emailBorderColor
        ? successColor
        : errorColor,
  };

    const textareaErrorStyle= {
     color: textAreaError== "" ? "" :  textAreaError && errorColor 
    }


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

        <form action="" className="reg-form" onSubmit={sendEmailToServer}>
         
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
            <p className="error" id="emailError" style={textareaErrorStyle}>{emailError}</p>
          </section>

          <button id="login_btn" className="submit-btn">Continue</button>
        </form>
      </section>
    );
}
