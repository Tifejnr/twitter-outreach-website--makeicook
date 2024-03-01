"use client";

import React, { useState } from "react";
import Link from "next/link";
import allIconsContainer from "../../auth/utils/icons/allIconsContainer";
import Image from "next/image";
import allLinks from "../../auth/utils/links/allLinks";

const contactPageLink = "/contact-us";
const toolsTutorialPage = "tools-tutorial";

export default function Blueprint(props: any) {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked((prevState) => !prevState);
  };

  const rotateOnToggle = {
    transform: isClicked ? "rotate(180deg)" : "rotate(0deg)",
  };

  const openFaqDetailsStyle = {
    maxHeight: isClicked ? "100%" : "0",
    marginTop: isClicked ? "1.2rem" : "0",
    overflow: isClicked ? "visible" : "hidden",
  };

  return (
    <li className="faq__faq-item" onClick={handleToggle}>
      <section className="faq-item__summary">
        <p className="faq-item__description">{props.faqObj.question}</p>
        <div className="faq-item__arrow-container">
          <Image
            style={rotateOnToggle}
            src={allIconsContainer.greenArrowIcon}
            alt="faq toggle icon"
            className="faq-item__arrow-icon"
            width={100}
            height={100}
          />
        </div>
      </section>

      <section className="faq-item__detail" style={openFaqDetailsStyle}>
        <p>
          {props.faqObj.answer}{" "}
          {props.faqObj.contactUsLink && (
            <Link className="contact-us-link-faq" href={contactPageLink}>
              Contact us
            </Link>
          )}
          {props.faqObj.toolsTutorial && (
            <Link className="contact-us-link-faq" href={toolsTutorialPage}>
              WFR Toolkit tutorial
            </Link>
          )}
          {props.faqObj.extensionChromeStoreLink && (
            <>
              <Link
                className="contact-us-link-faq"
                href={allLinks.extensionChromeStoreLink}
                target="_blank"
              >
                WFR Toolkit - Chrome store
              </Link>

              <span>
                , and click on the <b>&quot;Add to Chrome&quot;</b> button to
                install it.
              </span>
            </>
          )}
        </p>
      </section>
    </li>
  );
}
