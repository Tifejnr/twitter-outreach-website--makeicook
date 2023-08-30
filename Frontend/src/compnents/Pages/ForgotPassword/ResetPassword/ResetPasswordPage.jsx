import React , {useState} from 'react'
import axios from 'axios'
import AuthNav from '../../../Auth/AuthNav'
import showPasswordIcon from "../../../../assets/SVGs/PasswordRelated/show-password-eye.svg"
import hidePasswordIcon from "../../../../assets/SVGs/PasswordRelated/hide-password-eye.svg"
import validateAll from '../../../Auth/Auth-Input-Validation/validateAll'
import { notificationColorsObj } from '../../../utilis/colors/colors'
import { websiteUrl } from '../../../../JS functions/websiteUrl'
import { changeTabTitle } from '../../../utilis/changeTabTitle'

const resetPasswordTabTitle= "Reset Password – Collab for Trello"
const passwordsDoNotMatchMessage= "Passwords do not match"


export default function ResetPasswordPage() {
  const [isPasswordResetSuccessfull, setIsPasswordResetSuccessfull] = useState(false);

  //new password
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordBorderColor, setPasswordBorderColor]= useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);

  //retype new password
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordError, setNewPasswordError] = useState("")
  const [newPasswordBorderColor, setNewPasswordBorderColor]= useState(null)
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  changeTabTitle(resetPasswordTabTitle);

  const passwordBorderStyle = {
    borderColor: 
          passwordBorderColor === null
        ? 'grey'
        : passwordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const newPasswordBorderStyle = {
    borderColor: 
          newPasswordBorderColor === null
        ? 'grey'
        : newPasswordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };


const sendNewPasswordToServer = async (e)=> {
    e.preventDefault();

//validate password inputs
   const paramsObj = {
    password,
    }
  
   const retypedParamsObj = {
    password : newPassword,
    }

const validatePasswordFunc = (validateAll(paramsObj));

const retypedPasswordVal =  (validateAll(retypedParamsObj));


if(validatePasswordFunc.passwordValResponse) {
  setPasswordError(validatePasswordFunc.passwordValResponse)
  setPasswordBorderColor(false)
}

if(retypedPasswordVal.passwordValResponse) {
  setNewPasswordError(retypedPasswordVal.passwordValResponse)
  setNewPasswordBorderColor(false)
}

if (validatePasswordFunc.passwordValResponse || retypedPasswordVal.passwordValResponse) return

if (password!= newPassword) 
return (
  setNewPasswordError(passwordsDoNotMatchMessage), 
  setPasswordError(passwordsDoNotMatchMessage),
  setNewPasswordBorderColor(false),
  setPasswordBorderColor(false)
)
//remove all error validation noti 
  setNewPasswordError(""), 
  setPasswordError(""),
  setNewPasswordBorderColor(true),
  setPasswordBorderColor(true)

//proceed to sending the new password to server
 const resetPasswordUrl = `${websiteUrl}/api/forgot-password/:id/:token`;
  try {
    const response = await axios.post(resetPasswordUrl, {password});
    const data = await response.data;

  if (data.passwordUpdated) return setIsPasswordResetSuccessfull(true), console.log("sucessful reset");

  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data
        if (errorMessage.invalidToken)
    return setNewPasswordBorderColor(false),  setPasswordBorderColor(false), setNewPasswordError("Token expired, please restart this process")

        if (errorMessage.sessionExpired)
    return setNewPasswordBorderColor(false), setPasswordBorderColor(false), setNewPasswordError("Session expired, please restart this process")
    return false;
  }

}


  const handleShowPassword = ()=> {
    setPasswordVisible(prevState=>!prevState)
  }
  const handleShowNewPassword = ()=> {
    setNewPasswordVisible(prevState=>!prevState)
  }


  return (
   <>
   <AuthNav/>

    <section className="main-container reset-password-container" id="form">
      <article className="main__title reset-pass-title">
        <h2>Reset Your Password</h2>
      </article>

      <form action="" className="reg-form" onSubmit={sendNewPasswordToServer}>

      <fieldset className="input-wrapper">
        <label htmlFor="passwordId"><p>Enter New Password</p></label>
        <section className="innerInputWrapper"   style={passwordBorderStyle}>
           <input type={passwordVisible ? "text" : "password"} placeholder="minimum of 6 characters" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />

           { passwordVisible ?

            <picture title="Hide password" onClick={handleShowPassword} className="toggle-password-visisbiilty"><img src={hidePasswordIcon} alt="hide password icon" /></picture> :
            <picture title="Show password" onClick={handleShowPassword} className="toggle-password-visisbiilty"><img src={showPasswordIcon} alt="show password icon" /></picture>  
           }    

         </section>
        <p className="error" id="regErrorDisplay">{passwordError}</p>
      </fieldset>

       {/* Retype password Field */}

      <fieldset className="input-wrapper" id='retypedPasswordRapper'>
        <label htmlFor="newPasswordId"><p>Confirm New Password</p></label>
        <section className="innerInputWrapper"   style={newPasswordBorderStyle}>
           <input type={newPasswordVisible ? "text" : "password"} placeholder="minimum of 6 characters" id="newPasswordId" value={newPassword} 
           onChange={(e)=> setNewPassword(e.target.value)} 
        />
           { newPasswordVisible ?

            <picture title="Hide password" onClick={handleShowNewPassword} className="toggle-password-visisbiilty"><img src={hidePasswordIcon} alt="hide password icon" /></picture> :
            <picture title="Show password" onClick={handleShowNewPassword} className="toggle-password-visisbiilty"><img src={showPasswordIcon} alt="show password icon" /></picture>  
           }    

         </section>
        <p className="error" id="regErrorDisplay">{newPasswordError}</p>
      </fieldset>

        <button id="login_btn" className="submit-btn">Reset Password</button>
      </form>
    </section>
   </>
  )
}
