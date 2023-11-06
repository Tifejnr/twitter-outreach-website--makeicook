import React, { useEffect, useState } from "react";
import toggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg";
import copyToClipboard from "../../utilis/copy-to-clipboard/copyToClipboard";
import useStore from "../../Hooks/Zustand/usersStore";

const emailItem = "email";
const extensionKeyItem = "extensionKey";

export default function ExtensionLoginDetails() {
  const [
    isExtensionLoginDetailsContainerVisible,
    setIsExtensionLoginDetailsContainerVisible,
  ] = useState(false);

  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isExtensionKeyCopied, setIsExtensionKeyCopied] = useState(false);

  const extensionLoginDetailsFromServer = useStore(
    (state) => state.extensionLoginDetailsFromServer
  );

  // Function to load and display board members when the "show members" button is clicked.
  function handleExtensionContToggle() {
    setIsExtensionLoginDetailsContainerVisible((prevState) => !prevState);
  }

  // Style for rotating the "show members" icon.
  const rotateOnToggle = {
    transform: isExtensionLoginDetailsContainerVisible && "rotate(180deg)",
  };

  // Style for opening/closing the login details.
  const openExtensionLoginDetailsStyle = {
    maxHeight: isExtensionLoginDetailsContainerVisible ? "100%" : "0",
    marginTop: isExtensionLoginDetailsContainerVisible ? "1rem" : "-0.4rem",
    overflow: isExtensionLoginDetailsContainerVisible ? "visible" : "hidden",
  };
  // Style for click on copy text
  const copiedEmailTextStyle = {
    color: isEmailCopied && "#101c77",
  };
  const copiedKeyTextStyle = {
    color: isExtensionKeyCopied && "#101c77",
  };

  async function copyClickedValueToClipboard(value, itemCopied) {
    await copyToClipboard(value);

    if (itemCopied === emailItem) {
      setIsEmailCopied(true);

      setTimeout(() => {
        setIsEmailCopied(false);
      }, 3000);

      return;
    } else if (itemCopied === extensionKeyItem) {
      setIsExtensionKeyCopied(true);

      setTimeout(() => {
        setIsExtensionKeyCopied(false);
      }, 3000);

      return;
    }
  }
  return (
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
              style={copiedEmailTextStyle}
              onClick={async (e) =>
                copyClickedValueToClipboard(
                  extensionLoginDetailsFromServer.email,
                  emailItem
                )
              }
            >
              {isEmailCopied ? "Copied" : "Copy"}
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
              style={copiedKeyTextStyle}
              onClick={async (e) =>
                copyClickedValueToClipboard(
                  extensionLoginDetailsFromServer.extensionKey,
                  extensionKeyItem
                )
              }
            >
              {isExtensionKeyCopied ? "Copied" : "Copy"}
            </p>
          </article>
        </article>
      </section>
    </section>
  );
}
