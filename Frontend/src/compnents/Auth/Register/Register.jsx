import React , {useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import { LoginStatusContext } from "../../../App";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";



export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

if(validateInputs(paramsObj)) return console.log("Yooooh")

//Add properties to user data inside firestore cloud
  //   const propsToAdd = {
  //     isPaid: false,
  //     credits: 5,
  //     trello_token: "NA"
  //   }

  // const userDocRef = doc(db, collectionName, user.uid)
  // await setDoc(userDocRef, propsToAdd)
  //   console.log(user.uid)
  //    setLoggedInStatus(true)
  //    navigate('/');


    } catch (error) {
      console.log(error.message)
    }

  }

  return (
   <section>
    <form action="" onSubmit={sendInfoToServer}>
      <h1>Register</h1>

      <fieldset className="input-wrapper">
        <label htmlFor="emailId">Email</label>
        <input type="email" placeholder="Please enter an email you can access" id="emailId" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
        />
        <p className="error"></p>
      </fieldset>
      <fieldset className="input-wrapper">
        <label htmlFor="passwordId">Password</label>
        <input type="password" placeholder="Minimum of 6 characters" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
        <p className="error"></p>
      </fieldset>

      <button type="submit">Register</button>
    </form>
   </section>
  );
}


