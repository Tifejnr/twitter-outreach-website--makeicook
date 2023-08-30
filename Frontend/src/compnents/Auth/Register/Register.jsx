import React , {useContext, useState} from "react";
import { useNavigate, Link} from "react-router-dom";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";
import registerUser from "../../../JS functions/Auth/register";
import AuthNav from "../AuthNav";
import hidePasswordIcon from "../../../assets/SVGs/PasswordRelated/hide-password-eye.svg"
import showPasswordIcon from "../../../assets/SVGs/PasswordRelated/show-password-eye.svg"
import validateAll from "../Auth-Input-Validation/validateAll";
import { changeTabTitle } from "../../utilis/changeTabTitle";
import handlePageRefreshOnLoad from "../../utilis/refreshPageOnLoad";

const successColor = "#09c372";
const errorColor = "#ff3860"
const signUpTabTitle= "Sign up – Collab for Trello"
const signUpPageLink = "/sign-in"
const privacyPageLink= "/privacy-policy"
const termsPageLink = "/terms"


export default function Register() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailBorderColor, setEmailBorderColor]= useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordBorderColor, setPasswordBorderColor]= useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  changeTabTitle(signUpTabTitle)

  const emailBorderStyle = {
      borderColor:
      emailBorderColor === null
        ? 'grey'
        : emailBorderColor
        ? successColor
        : errorColor,
  };

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
  const regParam = {
    email,
    password
  }
 const regUser = await registerUser(regParam)

 if (regUser.errorMessage) return setPasswordError(regUser.errorMessage);

 if (regUser) return ( navigate('/authorize'))

 return false
}
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
  <>
  <AuthNav/>
<section className="main-container reg-container" id="register-main-cont">

    <article className="main__title">
        <h2>Get Started
            <h5><b>5</b> free credits for trial</h5>
        </h2>
      
      </article>
   <section>
    <form action="" className="reg-form" onSubmit={sendInfoToServer} >

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

       <h3 className="policy-agreement-text">
          By Registering, I agree to Work for Reputation's
          <Link to={termsPageLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(termsPageLink)
          }}
          >Terms of Use</Link> &  <span></span>
          <Link to={privacyPageLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(privacyPageLink)
          }}
          >Privacy Policy</Link>
       </h3>

        <button id="create_btn" type="submit" className="submit-btn">Get Started</button>

    </form>
   </section>

    <aside className="prompt-message register-prompt-message">
        <h3>
          Already have an account? <Link to={signUpPageLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(signUpPageLink)
          }}><b>Login</b></Link>
        </h3>
    </aside>

</section>

 </>
  );
}


