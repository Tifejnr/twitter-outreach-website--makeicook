import React , {useEffect, useState, useRef} from "react";
import { Link, useNavigate} from "react-router-dom";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";
import signInUser from "../../../JS functions/Auth/sign-in";
import AuthNav from "../AuthNav";
import hidePasswordIcon from "../../../assets/SVGs/PasswordRelated/hide-password-eye.svg"
import showPasswordIcon from "../../../assets/SVGs/PasswordRelated/show-password-eye.svg"


export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = ()=> {
    setPasswordVisible(prevState=>!prevState)
  }


const sendInfoToServer = async (e)=> {
    e.preventDefault();
    
  const emailId = document.getElementById("emailId")
  const passwordId = document.getElementById("passwordId")
  try {
   const paramsObj = {
    email,
    emailId,
    password,
    passwordId
    }

if(validateInputs(paramsObj)) {
  const signInParam = {
    email,
    password
  }
 const signedIn = await signInUser(signInParam)

 if (signedIn) return (navigate('/home'))

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
        />
        <p className="error"></p>
      </fieldset>
      <fieldset className="input-wrapper">
        <label htmlFor="passwordId"><p>Password</p></label>
        <section className="innerInputWrapper">
           <input type={passwordVisible ? "password": "text"} placeholder="Enter your password" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />

           { passwordVisible ?
  
            <picture title="Show password" onClick={handleShowPassword} className="toggle-password-visisbiilty"><img src={showPasswordIcon} alt="show password icon" /></picture>  
              :
            <picture title="Hide password" onClick={handleShowPassword} className="toggle-password-visisbiilty"><img src={hidePasswordIcon} alt="hide password icon" /></picture>
           }    

         </section>
        <p className="error" id="regErrorDisplay"></p>
      </fieldset>

       <section className="forgot-password">
          <a to="/forgot-password" className="forgot-pass-text"
            ><b>Forgot Password?</b></a>
       </section>

        <button id="login_btn" className="submit-btn">Login</button>
        <p className="widthRegulator"> By Registering, I agree to Work for Reputation's
          <a to="#">Terms of Use</a> & <a to="#">Privacy Policy</a></p>
    </form>
    <aside className="prompt-message">
        <h3>
          Don't have an account? <Link to="/register"><b>Register</b></Link>
        </h3>
    </aside>
   </section>
 </section>
</>
 );
}




