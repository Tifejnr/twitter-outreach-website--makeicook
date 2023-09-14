import React , {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import validateAll from "../Auth-Input-Validation/validateAll";
import signInUser from "./sign-in";
import AuthNav from "../AuthNav";
import hidePasswordIcon from "../../../assets/SVGs/PasswordRelated/hide-password-eye.svg"
import showPasswordIcon from "../../../assets/SVGs/PasswordRelated/show-password-eye.svg"
import { changeTabTitle } from "../../utilis/changeTabTitle";
import handlePageRefreshOnLoad from "../../utilis/refreshPageOnLoad";
import { notificationColorsObj } from "../../utilis/colors/colors";
import setCookies from "../../utilis/cookiesSetting/setCookies";

const logInTabTitle= "Log in – Collab for Trello"
const registerPageLink= "/register"
const forgotPasswordLink= "/forgot-password"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailBorderColor, setEmailBorderColor]= useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordBorderColor, setPasswordBorderColor]= useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  changeTabTitle(logInTabTitle)

  const emailBorderStyle = {
      borderColor:
      emailBorderColor === null
        ? 'grey'
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const passwordBorderStyle = {
    borderColor: 
          passwordBorderColor === null
        ? 'grey'
        : passwordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const handleShowPassword = ()=> {
    setPasswordVisible(prevState=>!prevState)
  }


const sendInfoToServer = async (e)=> {
    e.preventDefault();

  try {
   const paramsObj = {
    email,
    password,
    }

const validateFunctionResponse= (validateAll(paramsObj));

  if (validateFunctionResponse.emailValResponse) 
   {  
    setEmailError(validateFunctionResponse.emailValResponse), 
    setEmailBorderColor(false);
   }
   else{
    setEmailError("");     
    setEmailBorderColor(true)
   }

  
  if (validateFunctionResponse.passwordValResponse) {

      setPasswordError(validateFunctionResponse.passwordValResponse);
      setPasswordBorderColor(false)
   }

    else{
      setPasswordError("")
      setPasswordBorderColor(true)
    }

    if(!validateFunctionResponse.emailValResponse && !validateFunctionResponse.passwordValResponse) {
      const signInParam = {
        email,
        password
      }

    const signedInResponse = await signInUser(signInParam)

    if (signedInResponse.errorMessageNoJWT) return (navigate('/'))

    if (signedInResponse.errorMessage) return setPasswordError(signedInResponse.errorMessage)

    if (signedInResponse.signedIn) return (navigate('/home'))

    return false
    }

    } catch (error) {
      console.log(error.message)
    }
}

  return (
     
<>
<AuthNav/>

<section className="main-container reg-container" id="form">

    <article className="main__title">
        <h2>Log in</h2>
      </article>
   <section>
    <form action="" className="reg-form" onSubmit={sendInfoToServer}>

      <fieldset className="input-wrapper">
        <label htmlFor="emailId"><p>Email</p></label>
        <input type="email" placeholder="Enter your email" id="emailId" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
           style={emailBorderStyle}
        />
        <p className="error">{emailError}</p>
      </fieldset>

      <fieldset className="input-wrapper">
        <label htmlFor="passwordId"><p>Password</p></label>
        <section className="innerInputWrapper"   style={passwordBorderStyle}>
           <input type={passwordVisible ? "text" : "password"} placeholder="Enter your password" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />

           { passwordVisible ?

            <picture title="Hide password" onClick={handleShowPassword} className="toggle-password-visisbiilty"><img src={hidePasswordIcon} alt="hide password icon" /></picture> :
            <picture title="Show password" onClick={handleShowPassword} className="toggle-password-visisbiilty"><img src={showPasswordIcon} alt="show password icon" /></picture>  
           }    

         </section>
        <p className="error" id="regErrorDisplay">{passwordError}</p>
      </fieldset>

       <section className="forgot-password">
          <Link className="forgot-pass-text" to={forgotPasswordLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(forgotPasswordLink)
          }}
            ><b>Forgot Password?</b></Link>
       </section>
       

        <button id="login_btn" className="submit-btn">Login</button>
        <p className="widthRegulator"> By Registering, I agree to Work for Reputation's
          <Link to="#">Terms of Use</Link> & <Link to="#">Privacy Policy</Link></p>
    </form>
    <aside className="prompt-message">
        <h3>
          Don't have an account? <Link to={registerPageLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(registerPageLink)
          }}><b>Register</b>
          </Link>
        </h3>
    </aside>
   </section>
 </section>
</>
 );
}




