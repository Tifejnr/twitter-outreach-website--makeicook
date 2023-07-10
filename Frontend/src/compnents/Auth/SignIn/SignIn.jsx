import React , {useState, useContext} from "react";
import { useNavigate} from "react-router-dom";
import { LoginStatusContext } from "../../../App";
import { auth } from "../../../JS functions/FirebaseConfigs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import uidToServer from "../../../JS functions/uid-to-server/UidToServer";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginStatus, setLoggedInStatus]= useContext(LoginStatusContext);
  const navigate = useNavigate();

  const sendInfoToServer = async (e)=> {
    e.preventDefault();

    try {
    const useCredential = await signInWithEmailAndPassword(auth, email, password)
    if (useCredential)  {
    const user = useCredential.user;
    console.log(user.uid)
    setLoggedInStatus(true);
     navigate('/')
    } 

        } catch (error) {
      console.log(error.message)
    }


  }
  return (
   <section>
    <form action="" onSubmit={sendInfoToServer}>
      <h1>Log In</h1>

      <fieldset>
        <label htmlFor="emailId">Email</label>
        <input type="email" placeholder="Please enter an email you can access" id="emailId" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
        />
      </fieldset>
      <fieldset>
        <label htmlFor="passwordId">Password</label>
        <input type="password" placeholder="Minimum of 6 characters" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
   </section>
  );
}
