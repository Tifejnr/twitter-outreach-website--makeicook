import { useState } from "react";
import fullNameValidation from "./Contact-Input-Validations/fullname-validation";
import emailValidation from "./Contact-Input-Validations/emailValidation";
import textAreaValidation from "./Contact-Input-Validations/textAreaVal";
import notificationColorsObj from "../../auth/utils/colors/allColorsObj";

import CTAForTermsPolicy from "../Terms-and-privacy/CTAForTermsPolicy";
import contactUsRequestToServer from "./request-to-server/contactUsRequestToServer";
import compConstValues from "../../component-utils/comp-constant-values/compConstValues";

const hideVisiblilty = "hidden";
const showVisibilty = "visible";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [fullNameInstruction, setFullNameInstruction] = useState(
    "First name  Last name"
  );
  const [fullNameBorderColor, setFullNameBorderColor] = useState(null);

  const [email, setEmail] = useState("");
  const [emailInstruction, setEmailInstruction] = useState(
    "Please enter an email you can access"
  );
  const [emailBorderColor, setEmailBorderColor] = useState(null);

  const [textarea, setTextarea] = useState("");
  const [textareaInstruction, setTextareaInstruction] =
    useState("Minimum of 5 words");
  const [textareaBorderColor, setTextareaBorderColor] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const fullNameBorderStyle = {
    borderColor:
      fullNameBorderColor === null
        ? "grey"
        : fullNameBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const fullNameErrorStyle = {
    color:
      fullNameBorderColor === null
        ? "grey"
        : fullNameBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
    visibility:
      fullNameBorderColor === null
        ? showVisibilty
        : fullNameBorderColor
        ? hideVisiblilty
        : showVisibilty,
  };

  const emailBorderStyle = {
    borderColor:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const emailErrorStyle = {
    color:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
    visibility:
      emailBorderColor === null
        ? showVisibilty
        : emailBorderColor
        ? hideVisiblilty
        : showVisibilty,
  };

  //Text area styles when there is error
  const textareaBorderStyle = {
    borderColor:
      textareaBorderColor === null
        ? "grey"
        : textareaBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const textareaErrorStyle = {
    color:
      textareaBorderColor === null
        ? "grey"
        : textareaBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,

    visibility:
      textareaBorderColor === null
        ? showVisibilty
        : textareaBorderColor
        ? hideVisiblilty
        : showVisibilty,
  };

  async function sendToServer() {
    const isNameValidationOkay = fullNameValidation(fullName);
    const fullNameErrorMess =
      "Please enter in this format: First name  Last name";

    if (!isNameValidationOkay) {
      setFullNameBorderColor(false), setFullNameInstruction(fullNameErrorMess);
    } else {
      setFullNameBorderColor(true);
      setFullNameInstruction("");
    }

    const isEmailValid = emailValidation(email);
    const emptyEmailErrorMessage = "Email cannot be empty";
    const invalidEmailErrorMessage = "Please provide a valid email";

    if (!isEmailValid) {
      setEmailBorderColor(false);
      if (email == "") {
        setEmailInstruction(emptyEmailErrorMessage);
      } else setEmailInstruction(invalidEmailErrorMessage);
    } else {
      setEmailBorderColor(true);
      setEmailInstruction("");
    }

    const isTextAreaValid = textAreaValidation(textarea);
    const textAreaErrorMessage = "Question must be minimum of 5 words";

    if (!isTextAreaValid) {
      setTextareaBorderColor(false);
      setTextareaInstruction(textAreaErrorMessage);
    } else {
      setTextareaBorderColor(true);
      setTextareaInstruction("");
    }

    if (!isTextAreaValid || !isEmailValid || !isNameValidationOkay) {
      return;
    }

    const paramsToServer = {
      customerEmail: email,
      message: textarea,
      customerName: fullName,
    };

    const responseFromServer = await contactUsRequestToServer(paramsToServer);

    console.log("responseFromServer", responseFromServer);

    if (responseFromServer.emailSent) {
      setIsRequestSent(true);
    }
  }

  return (
    <>
      <section className="contact-us-form">
        <section className="main-wrapper">
          {isRequestSent && (
            <article className="messageReceived" id="messageReceived">
              <h1>Thank You!</h1>
              <p>Your question has been received.</p>
              <p id="infoOnDeliveryTime">
                We will review it and get back to you shortly
              </p>
            </article>
          )}

          <form className="form-wrapper">
            <h2 className="form-head">Got Questions? Ask us</h2>
            <section className="form-card">
              <input
                className="form-input"
                type="text"
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={fullNameBorderStyle}
              />
              <label htmlFor="full_name">Full Name</label>
              <p style={fullNameErrorStyle}>{fullNameInstruction}</p>
            </section>

            <section className="form-card">
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                style={emailBorderStyle}
              />
              <label htmlFor="email">Email</label>
              <p style={emailErrorStyle}>{emailInstruction}</p>
            </section>

            <section className="form-card">
              <textarea
                id="ContactUsTextArea"
                className="form-textarea"
                maxLength={600}
                rows={5}
                style={textareaBorderStyle}
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                required
              ></textarea>
              <label
                className="form-textarea-label"
                htmlFor="ContactUsTextArea"
              >
                My question
              </label>

              <p style={textareaErrorStyle}>{textareaInstruction}</p>
            </section>

            <section className="btn-wrap">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await sendToServer();
                }}
              >
                Submit
              </button>
            </section>
          </form>
          {/* )} */}
        </section>
      </section>

      <CTAForTermsPolicy title={compConstValues.contactUsPageCTA} />
    </>
  );
}
