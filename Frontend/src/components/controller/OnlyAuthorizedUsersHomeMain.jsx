import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import allLinks from "../auth/utils/links/allLinks";
import getCookies from "../component-utils/cookiesSetting/getCookies";
import PropTypes from "prop-types";

// This route protects both logged in and unauthorized users
export default function OnlyAuthorizedUsersHomeMain({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const token = getCookies();
    const isJssHomePage = true;

    (async function () {
      try {
        const url = `${allLinks.websiteUrl}/is-account-authorized`;
        const response = await axios.post(
          url,
          { token, isJssHomePage },
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        if (dataRaw.authorizedOnJSSHomePage) {
          setIsLoggedIn(true);
          return;
        }

        return setIsLoggedIn(false);
      } catch (error) {
        //handle any error from server or internet

        if (error.message == "Network Error") return setIsLoggedIn(false);
        const errorMessage = error.response.data;
        console.log(errorMessage);

        if (errorMessage.invalidJWT) return navigate("/");

        return setIsLoggedIn(false);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, [navigate]);

  // Use a conditional rendering based on isLoggedIn
  if (isLoggedIn === null) return "Loading.."; // Return null while waiting for the Promise

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}

OnlyAuthorizedUsersHomeMain.propTypes = {
  children: PropTypes.node.isRequired,
};
