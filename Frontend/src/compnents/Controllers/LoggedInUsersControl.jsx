import React, { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in';

export default  function LoggedInUsersControl({children}) {
const [isLoggedIn, setIsLoggedIn]= useState(false);


useEffect(() => {
(async  function  ()  {

  if ( await isUserLoggedIn()) setIsLoggedIn(prev=> !prev);
    console.log( "await isUserLoggedIn()", isLoggedIn)
  }
  () )
}, [isLoggedIn]);




console.log(isLoggedIn, "Latee one")

    
  if (isLoggedIn)  return( <>{children}</>)  
  return   (<Navigate to={"/"}/>);

}


