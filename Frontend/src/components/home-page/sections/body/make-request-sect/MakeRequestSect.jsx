import { useState } from "react";
import Image from "next/image";
import allIconsContainer from "@/app/components/auth/utils/icons/allIconsContainer";
import requestConstantValues from "./constant-values/requestConstantValues";
import makeRequestInputValidation from "./inputs-validations/makeRequestInputValidation";
import notificationColorsObj from "@/app/components/auth/utils/colors/allColorsObj";
import makeRequestToServer from "./request-to-server/makeRequestToServer";

export default function MakeRequestSect() {
  const [isSelectRequestClicked, setIsSelectRequestClicked] = useState(false);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [textRequestSelected, setTextRequestSelected] = useState(
    "Select Request Heading"
  );
  const [selectedTextRequestError, setSelectedTextRequestError] = useState("");
  const [selectedTextRequestBorderColor, setSelectedTextRequestBorderColor] =
    useState(null);
  const [textAreaText, setTextAreaText] = useState("");
  const [textareaError, setTextareaError] = useState("");
  const [textareaBorderColor, setTextareaBorderColor] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const requestForJobNiches = "Request Niches I want Jobs on";
  //functions

  function handleTextAreaChange(event) {
    setTextAreaText(event.target.value); // Update state with textarea value
  }

  function handleClickOfMakeRequestBtn() {
    const newToggledState = !isSelectRequestClicked;
    setIsSelectRequestClicked(newToggledState);
  }

  function handleRequestOptionsClick(event) {
    const target = event.target;
    const selectedText = target.innerText;
    setTextRequestSelected(selectedText);
    setIsSelectRequestClicked(false);

    if (selectedText == requestForJobNiches) return setOpenTextArea(true);

    setOpenTextArea(false);
  }

  const paramsMakeRequest = {
    textAreaText,
    isTextAreaOpened: openTextArea,
    headingText: textRequestSelected,
  };

  async function validateAndSendToServer(e) {
    e.preventDefault();
    const validationResponse = makeRequestInputValidation(paramsMakeRequest);

    if (validationResponse.requestHeaderError) {
      setSelectedTextRequestError(validationResponse.requestHeaderError);
      setSelectedTextRequestBorderColor(false);
      return false;
    } else {
      setSelectedTextRequestError("");
      setSelectedTextRequestBorderColor(true);
    }
    if (validationResponse.textAreaError) {
      setTextareaError(validationResponse.textAreaError);
      setTextareaBorderColor(false);
      return false;
    } else {
      setTextareaError("");
      setTextareaBorderColor(true);
    }

    const sendRequestResponse = await makeRequestToServer(paramsMakeRequest);

    if (sendRequestResponse.emailSent) {
      setOpenTextArea(false);
      setIsRequestSent(true);

      return true;
    }

    return false;
  }

  const textareaBorderStyle = {
    borderColor:
      textareaBorderColor === null
        ? "grey"
        : textareaBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const selectedTextRequestBorderStyle = {
    borderColor:
      selectedTextRequestBorderColor === null
        ? "grey"
        : selectedTextRequestBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  return (
    <section className="requestSection" id="requestSection">
      <h2 className="requestTitle">Make Request</h2>
      <form
        action=""
        className="text-area-form"
        id="form"
        onSubmit={async (e) => {
          await validateAndSendToServer(e);
        }}
      >
        <div className="selector">
          <label>{requestConstantValues.selectRequestHeadingText}</label>
          <div
            id="selectField"
            onClick={handleClickOfMakeRequestBtn}
            style={selectedTextRequestBorderStyle}
          >
            <p id="selectText">{textRequestSelected}</p>
            <span
              id="arrowIcon"
              className={`arrow ${isSelectRequestClicked && "rotate"}`}
            >
              <div className="faq-item__arrow-container">
                <Image
                  src={allIconsContainer.greenArrowIcon}
                  alt="short green arrow toggle icon"
                  className="faq-item__arrow-icon"
                  width={100}
                  height={100}
                />
              </div>
            </span>
          </div>

          <p id="selectReqError">{selectedTextRequestError}</p>

          <ul id="list" className={isSelectRequestClicked ? "" : "hide"}>
            <li className="options" onClick={handleRequestOptionsClick}>
              <p>Request Niches I want Jobs on</p>
            </li>
            <li className="options" onClick={handleRequestOptionsClick}>
              <p>Request Ashley Task Solution</p>
            </li>
            <li className="options" onClick={handleRequestOptionsClick}>
              <p>Request Robertson Task Solution</p>
            </li>
            <li className="options" onClick={handleRequestOptionsClick}>
              <p>Request Runge Task Solution</p>
            </li>
            <li className="options" onClick={handleRequestOptionsClick}>
              <p>Request Ruud Task Solution</p>
            </li>
          </ul>
        </div>

        {openTextArea && (
          <section className="textArea">
            <label htmlFor="messageId">
              Enter Niches you want jobs on below
            </label>
            <textarea
              style={textareaBorderStyle}
              maxLength={550}
              placeholder={`job 1 - [Niche]

job 2 - [Niche]`}
              id="messageId"
              value={textAreaText}
              onChange={handleTextAreaChange}
            ></textarea>
            <p id="textAreaError" className="error">
              {textareaError}
            </p>
          </section>
        )}

        {isRequestSent && (
          <article className="messageReceived" id="messageReceived">
            <h1>Thank You!</h1>
            <p>Your Request has Been Received.</p>
            <p id="infoOnDeliveryTime">
              {textAreaText != ""
                ? requestConstantValues.successfulJobNicheRequestText
                : requestConstantValues.successfulTaskSolutionRequestText}
            </p>
          </article>
        )}

        <button id="submitRequestBtn">Submit</button>
      </form>
    </section>
  );
}
