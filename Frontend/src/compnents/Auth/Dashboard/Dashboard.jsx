import React, {useState, useEffect} from 'react'
import { websiteUrl } from '../../../JS functions/websiteUrl';
export default function Dashboard() { 

  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [credits, setCredits] = useState(5);
  const [creditsExpiration, setCreditsExpiration] = useState("Never");


  useEffect(()=> {
    
  const abortController = new AbortController();

    (async function () {
      try {
        const url = `${websiteUrl}/start`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ true: true }),
          signal: abortController.signal, // Pass the signal to the fetch call
        });

        const dataRaw = await response.json();

        if (!dataRaw) {
          console.log("No data seen");
          return;
        }

        if (dataRaw.error) {
          if (dataRaw.error.code === "ENOTFOUND") {
            console.log("No internet network");
            return;
          }
        }

        const data = dataRaw.boards;
        setBoardsCollection(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  return (
    <>
    <nav className='nav dashboard-nav'>
       
       <LandingPageToggle innerText={"Credits: 500"}/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
      <NavItemsDashBoard/>  
      </ul>
  </nav> 

  <DashBody />

  <AuthFooter/>
    </>
  )
}
