import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import isLoginAndAuthorized from './isLoginAndAuthorized';

// This route protects both logged in and unauthorized users
export default function OnlyAuthorizedUsers({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const [noTokenYet, setNoTokenYet] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    checkIsLoginAndAuthorized();
  }, []); 
  
  const checkIsLoginAndAuthorized = async () => {
      try {
        const response = await isLoginAndAuthorized();

        console.log(response)

        if (response.authorized) return  setIsLoggedIn(true);
        if (response.backToOauthPage) return navigate('/authorize');

        return setIsLoggedIn(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        return setIsLoggedIn(false);
      }
    };


  // Use a conditional rendering based on isLoggedIn
  if (isLoggedIn === null) return null; // Return null while waiting for the Promise

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}
