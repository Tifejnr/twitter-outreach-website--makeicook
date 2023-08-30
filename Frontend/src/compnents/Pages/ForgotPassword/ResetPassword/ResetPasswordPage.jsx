import React , {useState} from 'react'
import AuthNav from '../../../Auth/AuthNav'
import showPasswordIcon from "../../../../assets/SVGs/PasswordRelated/show-password-eye.svg"
import hidePasswordIcon from "../../../../assets/SVGs/PasswordRelated/hide-password-eye.svg"


export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordBorderColor, setPasswordBorderColor]= useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordBorderStyle = {
    borderColor: 
          passwordBorderColor === null
        ? 'grey'
        : passwordBorderColor
        ? successColor
        : errorColor,
  };

  const handleShowPassword = ()=> {
    setPasswordVisible(prevState=>!prevState)
  }


  return (
   <>
   <AuthNav/>

   
    <section class="main-container reset-password-container" id="form">
      <article class="main__title reset-pass-title">
        <h2>Reset Your Password</h2>
      </article>

      <form action="" class="reg-form">

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

      <fieldset className="input-wrapper">
        <label htmlFor="passwordId"><p>Confirm New Password</p></label>
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

        <button id="login_btn" class="submit-btn">Reset Password</button>
      </form>
    </section>
   </>
  )
}
