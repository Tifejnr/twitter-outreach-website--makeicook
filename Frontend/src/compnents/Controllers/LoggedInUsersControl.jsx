import React, { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in';

export default  function LoggedInUsersControl({children}) {
const [isLoggedIn, setIsLoggedIn]= useState(false);

useEffect(() => {
  (async function ()  {
  const checkStatusTrue = await isUserLoggedIn()
  if (checkStatusTrue)
     setIsLoggedIn(prevState=>!prevState);
  }

  ())

  }, []);

  console.log(isLoggedIn)

  if (isLoggedIn) return( <>{children}</>) 

  return (<Navigate to={"/"}/>);
}



