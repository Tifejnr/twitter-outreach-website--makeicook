import { useState } from "react";
import allIconsContainer from "../../auth/utils/icons/allIconsContainer";
import allLinks from "../../auth/utils/links/allLinks";
import PropTypes from "prop-types";

const contactPageLink = "/contact-us";
const toolsTutorialPage = "/tutorials";

// Add PropTypes validation
Blueprint.propTypes = {
  faqObj: PropTypes.any.isRequired, // Validate pageLink as a required string
};

export default function Blueprint(props) {
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
          <img
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
          {props.faqObj.answer}
          {props.faqObj.contactUsLink && (
            <a className="contact-us-link-faq" href={contactPageLink}>
              Contact us
            </a>
          )}
          {props.faqObj.toolsTutorial && (
            <a className="contact-us-link-faq" href={toolsTutorialPage}>
              WFR Toolkit tutorial
            </a>
          )}
          {props.faqObj.extensionChromeStoreLink && (
            <>
              <a
                className="contact-us-link-faq"
                href={allLinks.extensionChromeStoreLink}
                target="_blank"
                rel="noreferrer"
              >
                WFR Toolkit - Chrome store
              </a>

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
