
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
    </form>
    <aside className="prompt-message">
        <h3>
          Don't have an account? <a to="/register"><b>Register</b></a>
        </h3>
    </aside>
   </section>
 </section>
<AuthFooter/>

</>