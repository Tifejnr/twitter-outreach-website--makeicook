"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import useStore from "../Hooks/Zustand/usersStore";
import getCookies from "../component-utils/cookiesSetting/getCookies";
import allLinks from "../auth/utils/links/allLinks";

// This route protects both logged in and unauthorized users
export default function OnlyAuthorizedUsers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  // const setCreditsFromServer = useStore((state) => state.setCreditsFromServer);
  // const setExtensionLoginDetailsFromServer = useStore(
  //   (state) => state.setExtensionLoginDetailsFromServer
  // );
  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    const token = getCookies();

    console.log("token", token);

    (async function () {
      try {
        const response = await axios.post(
          allLinks.isUserAuthorizedRoute,
          { token },
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        console.log("dataRaw", dataRaw);

        if (dataRaw.nullJWTToken) return router.push(allLinks.homePagePath);
        if (dataRaw.invalidJWT) return router.push(allLinks.homePagePath);

        if (dataRaw.isAuthorized) {
          // setExtensionLoginDetailsFromServer(dataRaw.extensionLoginDetails);
          // setCreditsFromServer(dataRaw.userCredits), setIsLoggedIn(true);
          setIsLoggedIn(true);

          console.log("Yeass ooo");
          return router.push(allLinks.lamStudHomePage);
        }

        return setIsLoggedIn(false);
      } catch (error: any) {
        //handle any error from server or internet

        if (error.message == "Network Error")
          return console.log("Network Error");
        const errorMessage = error;
        console.log("errror", errorMessage);

        if (errorMessage.nullJWTToken)
          return router.push(allLinks.homePagePath);
        if (errorMessage.invalidJWT) return router.push(allLinks.homePagePath);

        return setIsLoggedIn(false);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, [router]);

  // Use a conditional rendering based on isLoggedIn
  if (isLoggedIn === null) return ""; // Return null while waiting for the Promise

  return isLoggedIn ? <>{children}</> : router.push("/"); // Use router.push("/") to redirect to home page
}
