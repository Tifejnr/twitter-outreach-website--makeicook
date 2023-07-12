import React , {useContext, useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import { LoginStatusContext } from "../../../App";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";
import signInUser from "../../../JS functions/Auth/sign-in";
import AuthNav from "../AuthNav";
import AuthFooter from "../AuthFooter";


export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginStatus, setLoggedInStatus]= useContext(LoginStatusContext) ;
  const navigate = useNavigate();


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

 if (signedIn) return ( setLoggedInStatus(true),navigate('/'))

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
        <input type="password" placeholder="Enter your password" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
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
<AuthFooter/>

</>
 );
}




