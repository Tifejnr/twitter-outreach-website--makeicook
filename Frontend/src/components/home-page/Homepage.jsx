"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HomeSectionIntoOne from "./HomeSectionIntoOne";
import "./styles/homepage.css";
import getCookies from "../component-utils/cookiesSetting/getCookies";
import axios from "axios";
import allLinks from "../auth/utils/links/allLinks";

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    const token = getCookies();
    const isJssHomePage = true;

    if (isLoggedIn) {
      router.push(allLinks.lamStudHomePage);
    }

    (async function () {
      try {
        const response = await axios.post(
          allLinks.isUserAuthorizedRoute,
          { token, isJssHomePage },
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        if (dataRaw.nullJWTToken) return router.push(allLinks.homePagePath);
        if (dataRaw.invalidJWT) return router.push(allLinks.homePagePath);

        if (dataRaw.authorizedOnJSSHomePage) {
          // setExtensionLoginDetailsFromServer(dataRaw.extensionLoginDetails);
          // setCreditsFromServer(dataRaw.userCredits), setIsLoggedIn(true);
          setIsLoggedIn(true);

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
  }, [isLoggedIn, router]);

  if (isLoggedIn === null) return "Loading";

  return <>{isLoggedIn ? <HomeSectionIntoOne /> : null}</>;
}
