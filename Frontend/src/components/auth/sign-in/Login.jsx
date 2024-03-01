"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "../styles/auth.css";

import notificationColorsObj from "../utils/colors/allColorsObj";
import allIconsContainer from "../utils/icons/allIconsContainer";
import allLinks from "../utils/links/allLinks";
import setCookies from "../../component-utils/cookiesSetting/setCookies";
import validateAll from "../Auth-Input-Validation/validateAll";
import AuthNav from "../AuthNav";
import loginUserRequest from "../server-requests/loginUserRequest";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState<boolean | null>(
    null
  );

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState<
    boolean | null
  >(null);
  const [passwordVisible, setpasswordVisible] = useState<boolean | null>(false);

  const router = useRouter();

  function navigateToAnotherRoute(routeToGo: string) {
    router.push(routeToGo);
  }

  const emailBorderStyle = {
    borderColor:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const passwordBorderStyle = {
    borderColor:
      passwordBorderColor === null
        ? "grey"
        : passwordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const handleShowPassword = () => {
    setpasswordVisible((prevState) => !prevState);
  };

  const sendInfoToServer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const paramsObj = {
        email,
        password,
      };

      const validateFunctionResponse = validateAll(paramsObj);

      if (validateFunctionResponse.emailValResponse) {
        setEmailError(validateFunctionResponse.emailValResponse);
        setEmailBorderColor(false);
      } else {
        setEmailError("");
        setEmailBorderColor(true);
      }

      if (validateFunctionResponse.extensionKeyValResponse) {
        setPasswordError(validateFunctionResponse.extensionKeyValResponse);
        setPasswordBorderColor(false);
      } else {
        setPasswordError("");
        setPasswordBorderColor(true);
      }

      if (
        !validateFunctionResponse.emailValResponse &&
        !validateFunctionResponse.extensionKeyValResponse
      ) {
        const signInParam = {
          email,
          password,
        };

        const signedInResponse = await loginUserRequest(signInParam);

        console.log("signedInResponse", signedInResponse);

        if (signedInResponse.errorMessage) {
          setPasswordError(signedInResponse.errorMessage);
          setPasswordBorderColor(false);
          setEmailBorderColor(false);
          return;
        }

        if (signedInResponse.token) {
          //save token in chrome local storage for future auto sign in
          setCookies(signedInResponse.token);
          return navigateToAnotherRoute(allLinks.homePagePath);
        }

        return false;
      }
    } catch (error) {
      console.log(error);
      // console.log(error.message);
    }
  };

  return (
    <>
      <AuthNav />

      <section className="main-container reg-container" id="form">
        <article className="main__title">
          <h2>Sign In</h2>
        </article>

        <section>
          <form action="" className="reg-form" onSubmit={sendInfoToServer}>
            <fieldset className="input-wrapper">
              <label htmlFor="emailId">
                <p>Email</p>
              </label>

              <section className="innerInputWrapper" style={emailBorderStyle}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="emailId"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </section>

              <p className="error">{emailError}</p>
            </fieldset>

            <fieldset className="input-wrapper">
              <label htmlFor="passwordId">
                <p>Password</p>
              </label>
              <section
                className="innerInputWrapper"
                style={passwordBorderStyle}
              >
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  id="passwordId"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {passwordVisible ? (
                  <picture
                    title="Hide password"
                    onClick={handleShowPassword}
                    className="toggle-password-visisbiilty"
                  >
                    <Image
                      src={allIconsContainer.hidePasswordEye}
                      alt="hide extension key icon"
                      width="100"
                      height="100"
                    />
                  </picture>
                ) : (
                  <picture
                    title="Show password"
                    onClick={handleShowPassword}
                    className="toggle-password-visisbiilty"
                  >
                    <Image
                      src={allIconsContainer.showPasswordEye}
                      alt="show extension key icon"
                      width="100"
                      height="100"
                    />
                  </picture>
                )}
              </section>
              <p className="error" id="regErrorDisplay">
                {passwordError}
              </p>
            </fieldset>

            <section className="forgot-password">
              <Link
                className="forgot-pass-text"
                href={allLinks.forgotPasswordPage}
                target="_blank"
              >
                <b>Forgot password?</b>
              </Link>
            </section>

            <button id="login_btn" className="submit-btn">
              Sign In
            </button>
            <p className="widthRegulator">
              By Registering, I agree to Work for Reputation&apos;s
              <Link href="#">Terms of Use</Link> &
              <Link href="#">Privacy Policy</Link>
            </p>
          </form>
          <aside className="prompt-message">
            <h3>
              Don&apos;t have an account?&nbsp;
              <Link href={allLinks.signUpPage}>
                <b>Sign up</b>
              </Link>
            </h3>
          </aside>
        </section>
      </section>
    </>
  );
}
