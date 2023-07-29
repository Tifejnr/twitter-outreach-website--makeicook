import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import useStore from '../Hooks/Zustand/usersStore';
import { websiteUrl } from '../../JS functions/websiteUrl';

// This route protects both logged in and unauthorized users
export default function OnlyAuthorizedUsers({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const [noTokenYet, setNoTokenYet] = useState(null); 
  const setCreditsFromServer = useStore((state) => state.setCreditsFromServer);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        const url = `${websiteUrl}/is-account-authorized`;
        const response = await axios.post(
          url,
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        console.log(dataRaw)


      if (dataRaw.authorized) return  (setCreditsFromServer(dataRaw.userCredits),setIsLoggedIn(true));

       return setIsLoggedIn(false);
     
      } catch (error) {
        //handle any error from server or internet

        if(error.message=="Network Error") return console.log("Network Error");
        const errorMessage= error.response.data
        console.log(errorMessage)

        if (errorMessage.invalidJWT) return  navigate('/');
        if (errorMessage.backToOauthPage) return navigate('/authorize');

        return setIsLoggedIn(false);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  // Use a conditional rendering based on isLoggedIn
  if (isLoggedIn === null) return null; // Return null while waiting for the Promise

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}
