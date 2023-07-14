import React, { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in';

export default  function LoggedInUsersControl({children}) {
const [isLoggedIn, setIsLoggedIn]= useState(false);


useEffect(() => {
async  function checkStatusNow ()  {
  const checkStatusTrue = await isUserLoggedIn()
  console.log(checkStatusTrue, isLoggedIn)
  if (checkStatusTrue) setIsLoggedIn(true);
  }

checkStatusNow ()
  (() => {
     console.log("checkStatusTrue" , isLoggedIn)
  })();
}, []);




  console.log(isLoggedIn, "Latee one")

  if (!isLoggedIn) return (<Navigate to={"/"}/>);
  return( <>{children}</>)   

}


