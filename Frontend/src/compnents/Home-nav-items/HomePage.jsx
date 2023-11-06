import React, { useEffect, useState } from "react";
import HomeNavBar from "./HomeNavBar";
import useStore from "../Hooks/Zustand/usersStore";
import Boards from "./Sections/BoardsTools/Boards";
import Workspaces from "./Sections/Workspaces/Workspaces";
import { changeTabTitle } from "../utilis/changeTabTitle";
import toggleIcon from "../../assets/SVGs/faq-toggle-icon.svg";
import copyToClipboard from "../utilis/copy-to-clipboard/copyToClipboard";

const homepageTabTitle = "Add Members to Boards – Collab for Trello";
export default function HomePage() {
  const [
    isExtensionLoginDetailsContainerVisible,
    setIsExtensionLoginDetailsContainerVisible,
  ] = useState(false);

  // const [extensionKey, setExtensionKey] = useState("");
  // const [emailFromServer, setEmailFromServer] = useState("");

  const creditsFromServer = useStore((state) => state.creditsFromServer);

  const extensionLoginDetailsFromServer = useStore(
    (state) => state.extensionLoginDetailsFromServer
  );

  // Function to load and display board members when the "show members" button is clicked.
  function handleExtensionContToggle() {
    setIsExtensionLoginDetailsContainerVisible((prevState) => !prevState);
  }

  changeTabTitle(homepageTabTitle);
  // Style for rotating the "show members" icon.
  const rotateOnToggle = {
    transform: isExtensionLoginDetailsContainerVisible && "rotate(180deg)",
  };

  // Style for opening/closing the member list.
  const openExtensionLoginDetailsStyle = {
    maxHeight: isExtensionLoginDetailsContainerVisible ? "100%" : "0",
    marginTop: isExtensionLoginDetailsContainerVisible ? "1rem" : "-0.4rem",
    overflow: isExtensionLoginDetailsContainerVisible ? "visible" : "hidden",
  };

  async function copyClickedValueToClipboard(value) {
    await copyToClipboard(value);
  }

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
        <section className="extensionLoginDetailsContainer">
          <article
            onClick={handleExtensionContToggle}
            className="extensionInstructionCont"
          >
            <p>View my extension login details</p>
            <picture title="Click to view extension login details">
              <img style={rotateOnToggle} src={toggleIcon} alt="toggle icon" />
            </picture>
          </article>

          <section
            className="main-eachExtensionDetailCont"
            style={openExtensionLoginDetailsStyle}
          >
            <article className="eachExtensionDetailCont">
              <label htmlFor="">Email:</label>
              <article>
                <p>{extensionLoginDetailsFromServer.email}</p>
                <p
                  title="Click to copy email"
                  role="button"
                  onClick={async (e) =>
                    copyClickedValueToClipboard(
                      extensionLoginDetailsFromServer.email
                    )
                  }
                >
                  Copy
                </p>
              </article>
            </article>

            <article className="eachExtensionDetailCont">
              <label htmlFor="">Extension Key:</label>
              <article>
                <p>{extensionLoginDetailsFromServer.extensionKey}</p>
                <p
                  title="Click to copy extension key"
                  role="button"
                  onClick={async (e) =>
                    copyClickedValueToClipboard(
                      extensionLoginDetailsFromServer.extensionKey
                    )
                  }
                >
                  Copy
                </p>
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
