import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import isLoginAndAuthorized from './isLoginAndAuthorized';

// This route protects both logged in and unauthorized users
export default function LoggedInUsersControl({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null instead of undefined
  const navigate = useNavigate();

  useEffect(() => {
    checkIsLoginAndAuthorized();
  }, []); 
  
  const checkIsLoginAndAuthorized = async () => {
      try {
        const response = await isLoginAndAuthorized();
        
        if (response.authorized)  setIsLoggedIn(true);
        if (response.backToOauthPage)  navigate('/authorize');

        return setIsLoggedIn(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        return setIsLoggedIn(false);
      }
    };

  // Include navigate in the dependency array

  // Use a conditional rendering based on isLoggedIn
  if (isLoggedIn === null) return null; // Return null while waiting for the Promise

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}
