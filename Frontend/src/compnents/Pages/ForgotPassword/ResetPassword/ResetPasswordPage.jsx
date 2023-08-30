import React , {useState} from 'react'
import AuthNav from '../../../Auth/AuthNav'
import showPasswordIcon from "../../../../assets/SVGs/PasswordRelated/show-password-eye.svg"
import hidePasswordIcon from "../../../../assets/SVGs/PasswordRelated/hide-password-eye.svg"
import validateAll from '../../../Auth/Auth-Input-Validation/validateAll'


// async function resetPassword() {
//   const password = passwordId.value;

//   const res = await fetch(
//     "https://workforreputation.com/api/forgot-password/:id/:token",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({
//         password,
//       }),
//     }
//   );

//   const data = await res.json();
//   console.log(data);

//   if (data.invalidLoginDetails)
//     return setError(invalidDetailsErr, "Invalid password or password");

//   if (data.passwordUpdated) return showPasswordResetSuccess();

const passwordsDoNotMatchMessage= "Passwords do not match"


export default function ResetPasswordPage() {
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

  const passwordBorderStyle = {
    borderColor: 
          passwordBorderColor === null
        ? 'grey'
        : passwordBorderColor
        ? successColor
        : errorColor,
  };

  const newPasswordBorderStyle = {
    borderColor: 
          newPasswordBorderColor === null
        ? 'grey'
        : newPasswordBorderColor
        ? successColor
        : errorColor,
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
  setNewPasswordError(validatePasswordFunc.passwordValResponse)
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


  // if (validateFunctionResponse.emailValResponse) 
  //  {  
  //   setEmailError(validateFunctionResponse.emailValResponse), 
  //   setEmailBorderColor(false);
  //  }
  //  else{
  //   setEmailError("");     
  //   setEmailBorderColor(true)
  //  }

  
  // if (validateFunctionResponse.passwordValResponse) {

  //     setPasswordError(validateFunctionResponse.passwordValResponse);
  //     setPasswordBorderColor(false)
  //  }

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

      <form action="" className="reg-form">

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

      <fieldset className="input-wrapper">
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

        <button id="login_btn" className="submit-btn" onClick={sendNewPasswordToServer}>Reset Password</button>
      </form>
    </section>
   </>
  )
}
