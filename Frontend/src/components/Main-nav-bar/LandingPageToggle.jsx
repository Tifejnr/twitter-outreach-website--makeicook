"use client";

import React, { useState } from "react";
import Link from "next/link";
import ToggleLabel from "./ToggleLabel";

export default function LandingPageToggle(props: any) {
  // Define state variables to keep track of the toggle state
  // const isMenuIconShowing = useStore((state) => state.isMenuIconShowing);
  // const setIsMenuIconShowing = useStore((state) => state.setIsMenuIconShowing);
  const isMenuIconShowing = true;
  const setIsMenuIconShowing = true;

  // Function to handle the button click and toggle the state
  const handleClick = () => {
    // setIsMenuIconShowing(!isMenuIconShowing);
  };

  return (
    <>
      <input
        type="checkbox"
        id="nav__checkbox"
        className="nav__checkbox"
        onChange={handleClick}
      />
      <section className="mainNavIcons">
        {props.noCredits ? (
          ""
        ) : (
          <article className="myProfileIcon">
            <Link href={props.pageLink}>
              <button id="start-for-free-mobile-lp">
                <p>{props.innerText}</p>
              </button>
            </Link>
          </article>
        )}
        <ToggleLabel isMenuIconShowing={isMenuIconShowing} />
      </section>
    </>
  );
}
