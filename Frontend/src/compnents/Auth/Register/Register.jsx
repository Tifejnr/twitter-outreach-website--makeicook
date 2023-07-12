import React , {useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import { LoginStatusContext } from "../../../App";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";
import registerUser from "../../../JS functions/Auth/register";
import AuthNav from "../AuthNav";
import AuthFooter from "../AuthFooter";




export default function Register() {
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
  const regParam = {
    email,
    password
  }
 const regUser = await registerUser(regParam)

 if (regUser) return ( setLoggedInStatus(true),navigate('/'))

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
        <h2>Register Now</h2>
      </article>
   <section>
    <form action="" className="reg-form" onSubmit={sendInfoToServer} >

      <fieldset className="input-wrapper">
        <label htmlFor="emailId"><p>Email</p></label>
        <input type="email" placeholder="Please enter an email you can access" id="emailId" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
        />
        <p className="error"></p>
      </fieldset>
      <fieldset className="input-wrapper">
        <label htmlFor="passwordId"><p>Password</p></label>
        <input type="password" placeholder="Minimum of 6 characters" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
        <p className="error" id="regErrorDisplay"></p>
      </fieldset>

       <h3 className="policy-agreement-text">
          By Registering, I agree to Work for Reputation's
          <a to="#">Terms of Use</a> & <a to="#">Privacy Policy</a>
       </h3>

        <button id="create_btn" type="submit" className="submit-btn">Register</button>
    </form>
   </section>

    <aside className="prompt-message">
        <h3>
          Already have an account? <a to="/login"><b>Login</b></a>
        </h3>
    </aside>

</section>

<AuthFooter/>
 </>
  );
}


