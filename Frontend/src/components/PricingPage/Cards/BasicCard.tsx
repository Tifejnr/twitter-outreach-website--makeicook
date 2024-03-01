"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import allIconsContainer from "../../auth/utils/icons/allIconsContainer";
// import getCheckoutLink from "../checkoutUrl/fetchUrl";
import Image from "next/image";

export default function BasicCard(props: any) {
  const planNameRef = useRef(null);
  // const navigate = useNavigate();

  const planCheckout = async () => {
    const planNameTarget = planNameRef.current as HTMLElement | null;

    if (!planNameTarget) return console.log("plan name ref not found");
    const planName = planNameTarget.innerHTML;
    // const response = await getCheckoutLink(planName);
    // console.log(response);

    // if (response.unauthorizedToken) return navigate("/register");

    // if (response.invalidJWT) return navigate("/sign-in");

    // const checkoutUrl = response.checkoutUrl;

    // Redirect the user to the specified link
    // if (checkoutUrl) window.location.href = checkoutUrl;
  };

  return (
    <div className="col-sm-4">
      <div className="card text-center">
        <picture className="title">
          <h2 ref={planNameRef}> {props.planObjs.planName} </h2>
        </picture>
        <div className="price">
          <h4>${props.planObjs.planPrice}</h4>

          <p>
            <b>Right choice</b> if tools usage is{" "}
            <b>{props.planObjs.suitabilityTimeUsage}</b>
          </p>
        </div>
        <div className="option">
          <ul>
            <li>
              <Image
                src={allIconsContainer.checkMarkIcon}
                alt="check mark icon"
                width={100}
                height={100}
              />
              <p> {props.planObjs.planCreditsAmount} Credits</p>
            </li>
            <li>
              <Image
                src={allIconsContainer.checkMarkIcon}
                alt="check mark icon"
                width={100}
                height={100}
              />
              <p>
                <b>${props.planObjs.perCreditInfo}</b> per credit
              </p>
            </li>
            <li>
              <Image
                src={allIconsContainer.checkMarkIcon}
                alt="check mark icon"
                width={100}
                height={100}
              />
              <p>No Expiration</p>
            </li>
            <li>
              <Image
                src={allIconsContainer.checkMarkIcon}
                alt="check mark icon"
                width={100}
                height={100}
              />
              <p>Access to All Tools</p>
            </li>
          </ul>
        </div>
        <button className="getPlanBtn">Get Plan</button>
      </div>
    </div>
  );
}
