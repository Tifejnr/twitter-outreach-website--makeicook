import React , {useState} from "react";
import { auth } from "../../../JS functions/FirebaseConfigs/firebase";
import { createUserWithEmailAndPassword,  updateProfile } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const sendInfoToServer = async (e)=> {
    e.preventDefault();

    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name
    });


     } catch (error) {
      console.log(error.message)
    }


  }
  return (
   <section>
    <form action="" onSubmit={sendInfoToServer}>
      <h1>Login</h1>

      <fieldset>
        <label htmlFor="nameId">Name</label>
        <input type="text" placeholder="First name Last name" id="nameId" value={name} 
                onChange={(e)=> setName(e.target.value)} 
        />
      </fieldset>
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

      <button type="submit">Register</button>
    </form>
   </section>
  );
}
