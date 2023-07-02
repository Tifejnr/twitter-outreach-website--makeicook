import React , {useState} from "react";
import 

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const sendInfoToServer = ()=> {

    
  }
  return (
   <section>
    <form action="" onSubmit={sendInfoToServer}>
      <h1>Login</h1>

      <fieldset>
        <label htmlFor="">Name</label>
        <input type="text" placeholder="First name Last name" value={name} 
                onChange={(e)=> setName(e.target.value)} 
        />
      </fieldset>
      <fieldset>
        <label htmlFor="">Email</label>
        <input type="email" placeholder="Please enter an email you can access" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
        />
      </fieldset>
      <fieldset>
        <label htmlFor="">Password</label>
        <input type="password" placeholder="Minimum of 6 characters" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
   </section>
  );
}
