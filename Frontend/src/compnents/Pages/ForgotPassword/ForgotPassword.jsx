import axios from "axios"
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { websiteUrl } from "../../../JS functions/websiteUrl";
import validateEmailInput from "../../Auth/Auth-Input-Validation/validateEmailInput";
import EmailSentPage from "./Email-sent-page/EmailSentPage";
import { changeTabTitle } from "../../utilis/changeTabTitle";
import { notificationColorsObj } from "../../utilis/colors/colors";

const forgotPasswordTabTitle = "Forgot Password – Collab for Trello"
const emailNotRegisteredErrorMessage= "Email is not registered"
const invalidEmailErrorMessage= "Please provide a valid email adress"

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [textAreaError, setTextAreaError] = useState("")
  const [emailBorderColor, setEmailBorderColor]= useState(null)

 changeTabTitle(forgotPasswordTabTitle)
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
    if (data.emailSent) return (setIsEmailSent(true))

  } catch (error) {
    console.log(error);
    const userNotFoundErrorMessage = error.response.data.notFoundUserEmail;
    const emailValErrorMessage = error.response.data.emailValError;

    if (emailValErrorMessage) return setEmailError(invalidEmailErrorMessage), setEmailBorderColor(false)
    if (userNotFoundErrorMessage) return setEmailError(emailNotRegisteredErrorMessage ), setEmailBorderColor(false)
    return false;
  }

  }

    const emailBorderStyle = {
      borderColor:
      emailBorderColor === null
        ? 'grey'
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

    const textareaErrorStyle= {
     color: textAreaError== "" ? "" :  textAreaError && notificationColorsObj.errorColor 
    }


    return (
     <>
     {
      isEmailSent ? <EmailSentPage/> 
      
      : 

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

          <button id="login_btn" className="submit-btn" >Continue</button>
        </form>
      </section>
    }
    </> 
    );
}
