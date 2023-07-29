import React, { useState, useEffect } from 'react'
import {useNavigate, Navigate} from "react-router-dom";
import isLoginAndAuthorized from './isLoginAndAuthorized';

//This route protects both logged in an unauthorized users
export default  function LoggedInUsersControl({children}) {
const [isLoggedIn, setIsLoggedIn]= useState();
  const navigate = useNavigate();

  useEffect(() => {
  const checkIsLoginAndAuthorized = async () => {
    try {
      const response = await isLoginAndAuthorized();

      console.log(response)
      if (response.authorized) return setIsLoggedIn(true)
      if (response.backToOauthPage) return navigate('/authorize');

        return setIsLoggedIn(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      return setIsLoggedIn(false)
    }
  };

    checkIsLoginAndAuthorized();
  }, []);

  if (isLoggedIn === undefined) return "";


  return(isLoggedIn ? <>{children}</> : <Navigate to={"/"}/>)  

}


