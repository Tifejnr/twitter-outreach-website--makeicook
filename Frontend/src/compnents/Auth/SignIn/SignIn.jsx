import React , {useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import { LoginStatusContext } from "../../../App";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";
import signInUser from "../../../JS functions/Auth/sign-in";



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
   <section>
    <form action="" onSubmit={sendInfoToServer}>
      <h1>Log in</h1>

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

      <button type="submit">Log in</button>
    </form>
   </section>
  );
}


