import React, { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in';


export default  function LoggedInUsersControl({children}) {
const [isLoggedIn, setIsLoggedIn]= useState();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);


  const checkIfLoggedIn = async () => {
    try {
      const response = await isUserLoggedIn();
      if (!response) return setIsLoggedIn(true)
        return setIsLoggedIn(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      return setIsLoggedIn(false)
    }
  };

  if (isLoggedIn === undefined) return "";


  return(isLoggedIn ? <>{children}</> : <Navigate to={"/"}/>)  

}


