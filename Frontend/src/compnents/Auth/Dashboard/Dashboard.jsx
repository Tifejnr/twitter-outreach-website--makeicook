import React, {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import AuthFooter from '../AuthFooter';
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle"
import NavLogo from '../../Main-nav-bar/NavLogo';
import NavItemsDashBoard from './NavItemsDashBoard';
import ChangePassword from "./Sections/ChangePassword";
import ProfileDetails from "./Sections/ProfileDetails";
import Logout from "./Sections/Logout";
import BuyCreditsButton from "./Sections/BuyCreditsButton";
import { websiteUrl } from '../../../JS functions/websiteUrl';




export default function Dashboard() { 
  const [dashboardObj, setDashboardObj] = useState({
    name: "",
    email: "",
    credits: null,
    currentPlan: ""

  });


 const navigate = useNavigate();

  useEffect(()=> {
  const url = `${websiteUrl}/api/dashboard`;

  const abortController = new AbortController();

    (async function () {
      try {
       const response = await axios.post(url, { true: true }, { signal: abortController.signal,});

       if (response.unauthorizedToken) return ( navigate('/'))

        if (response.error) {
          if (response.error.code === "ENOTFOUND") {
            console.log("No internet network");
            return;
          }
        }

        const dashboardData = response.data.accountUser;
        setDashboardObj(dashboardData);

      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);


  // if (dashboardObj.email === "") return  console.log("server error");

  return (
    <>
    <nav className='nav dashboard-nav'>
       
       <LandingPageToggle innerText={dashboardObj.credits==1 ? `Credit: ${dashboardObj.credits}` :
       
       `Credits: ${dashboardObj.credits}`
       } pageLink ="#"/>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>
       
      <NavItemsDashBoard dashboardObj= {dashboardObj}/>  
      </ul>
  </nav> 

  <main className="dashboard-container">
       <ProfileDetails dashboardObj= {dashboardObj}/>
        <BuyCreditsButton/>
        <ChangePassword />
  </main>


  <Logout/>

  <AuthFooter/>

</>
  )
}


