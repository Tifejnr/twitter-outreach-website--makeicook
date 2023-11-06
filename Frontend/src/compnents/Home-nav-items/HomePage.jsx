import React, { useEffect, useState } from "react";
import HomeNavBar from "./HomeNavBar";
import useStore from "../Hooks/Zustand/usersStore";
import Boards from "./Sections/BoardsTools/Boards";
import Workspaces from "./Sections/Workspaces/Workspaces";
import { changeTabTitle } from "../utilis/changeTabTitle";
import toggleIcon from "../../assets/SVGs/faq-toggle-icon.svg";

const homepageTabTitle = "Add Members to Boards – Collab for Trello";
export default function HomePage() {
  const [
    isExtensionLoginDetailsContainerVisible,
    setIsExtensionLoginDetailsContainerVisible,
  ] = useState(false);
  changeTabTitle(homepageTabTitle);

  const creditsFromServer = useStore((state) => state.creditsFromServer);

  // Function to load and display board members when the "show members" button is clicked.
  function handleExtensionContToggle() {
    setIsExtensionLoginDetailsContainerVisible((prevState) => !prevState);
  }

  // Style for rotating the "show members" icon.
  const rotateOnToggle = {
    transform: isExtensionLoginDetailsContainerVisible && "rotate(180deg)",
  };

  // Style for opening/closing the member list.
  const openExtensionLoginDetailsStyle = {
    maxHeight: isExtensionLoginDetailsContainerVisible ? "100%" : "0",
    marginTop: isExtensionLoginDetailsContainerVisible ? "0.8rem" : "-0.4rem",
    overflow: isExtensionLoginDetailsContainerVisible ? "visible" : "hidden",
  };

  return (
    <>
      <HomeNavBar
        innerText={
          creditsFromServer == 1
            ? `Credit:${creditsFromServer} `
            : `Credits:${creditsFromServer}`
        }
        pagelink="#"
        noTools={true}
      />

      <main className="home-main-cont">
        <section
          className="extensionLoginDetailsContainer"
          title="Click to view extension login details"
          // style={openExtensionLoginDetailsStyle}
          // onClick={handleExtensionContToggle}
        >
          <article>
            View my extension login details
            <picture title="Click to view extension login details">
              <img
                style={rotateOnToggle}
                src={toggleIcon}
                alt="show member icon"
              />
            </picture>
          </article>

          <section>
            <article className="eachExtensionDetailCont">
              <label htmlFor="">Email</label>
              <article>
                <p>ahhaha</p>
                <p>copy</p>
              </article>
            </article>
          </section>
        </section>
        <h2>Select tool that matches the action you want to execute:</h2>
        <Boards />
        <Workspaces />
      </main>
    </>
  );
}
