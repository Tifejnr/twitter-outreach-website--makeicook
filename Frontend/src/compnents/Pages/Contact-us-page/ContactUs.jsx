import React, { useState } from "react";
import fullNameValidation from "./Contact-Input-Validations/fullname-validation";
import emailValidation from "./Contact-Input-Validations/emailValidation";
import textAreaValidation from "./Contact-Input-Validations/textAreaVal";

const successColor = "#09c372";
const errorColor = "#ff3860";

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
  const [textareaInstruction, setTextareaInstruction] = useState(
    "Must be more than 5 words"
  );
  const [textareaBorderColor, setTextareaBorderColor] = useState(null);

  const fullNameBorderStyle = {
    borderColor:
      fullNameBorderColor === null
        ? "grey"
        : fullNameBorderColor
        ? successColor
        : errorColor,
  };

  const fullNameErrorStyle = {
    color:
      fullNameBorderColor === null
        ? "grey"
        : fullNameBorderColor
        ? successColor
        : errorColor,
  };

  const emailBorderStyle = {
    borderColor:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? successColor
        : errorColor,
  };

  const emailErrorStyle = {
    color:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? successColor
        : errorColor,
  };

//Text area styles when there is error
  const textareaBorderStyle = {
    borderColor:
      textareaBorderColor === null
        ? "grey"
        : textareaBorderColor
        ? successColor
        : errorColor,
  };

  const textareaErrorStyle = {
    color:
      textareaBorderColor === null
        ? "grey"
        : textareaBorderColor
        ? successColor
        : errorColor,
  };

  //   const passwordBorderStyle = {
  //     borderColor:
  //           passwordBorderColor === null
  //         ? 'grey'
  //         : passwordBorderColor
  //         ? successColor
  //         : errorColor,
  //   };

  function sendToServer() {
    const isNameValidationOkay = fullNameValidation(fullName);
    const fullNameErrorMess =
      "Please enter in this format: firstname  lastname";

    if (!isNameValidationOkay) {
      setFullNameBorderColor(false),
        setFullNameInstruction(fullNameErrorMess)
    } else {
      setFullNameBorderColor(true);
      setFullNameInstruction("");
    }

    const isEmailValid = emailValidation(email);
    const emptyEmailErrorMessage ="Email cannot be empty"
    const invalidEmailErrorMessage= "Please provide a valid email"

    if (!isEmailValid) {
    setEmailBorderColor(false)
    if (email=="")  {
      setEmailInstruction(emptyEmailErrorMessage)}
      else
    setEmailInstruction(invalidEmailErrorMessage)
    }

    else{
       setEmailBorderColor(true)
       setEmailInstruction("")
    }

    const isTextAreaValid = textAreaValidation(textarea);

    if (!isTextAreaValid) {
    setTextareaBorderColor(false)
    }

    else{
       setTextareaBorderColor(true)
       setTextareaInstruction("")
    }
  }

  return (
    <>
      <section className="contact-us-form">
        <section className="main-wrapper">
          <h2 className="form-head">Contact us</h2>

          <form className="form-wrapper">
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
                maxLength="600"
                rows="5"
                style={textareaBorderStyle}
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                required></textarea>
              <label
                className="form-textarea-label"
                htmlFor="ContactUsTextArea">
                My query
              </label>

              <p style={textareaErrorStyle}>{textareaInstruction}</p>
            </section>

            <section className="btn-wrap">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sendToServer();
                }}>
                Submit
              </button>
            </section>
          </form>
        </section>
      </section>
    </>
  );
}
