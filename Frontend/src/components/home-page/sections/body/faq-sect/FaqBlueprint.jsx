import allIconsContainer from "../../../../auth/utils/icons/allIconsContainer";
import { useState } from "react";
import InviteWhenCompletion from "./all-faq-objects-array/faq-completion-comps/InviteWhen";
import DontKnowWhatToSubmitCompletion from "./all-faq-objects-array/faq-completion-comps/DontKnowWhatToSubmit";
import NoFeedbackAfterEndContractCompletion from "./all-faq-objects-array/faq-completion-comps/NoFeedbackAfterEndContract";
import SeeingFeedbackCompletion from "./all-faq-objects-array/faq-completion-comps/SeeingFeedback";
import PropTypes from "prop-types";

export default function FaqBlueprint(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked((prevState) => !prevState);
  };

  const rotateOnToggle = {
    transform: isClicked ? "rotate(180deg)" : undefined,
  };

  const openFaqDetailsStyle = {
    maxHeight: isClicked ? "100%" : "0",
    marginTop: isClicked ? "1.2rem" : "1.1rem",
    overflow: isClicked ? "visible" : "hidden",
  };

  return (
    <li className="faq__faq-item" onClick={handleToggle}>
      <section className="faq-item__summary">
        <p className="faq-item__description">
          <b>{props.index + 1}. </b> {props.question}
        </p>
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
        <h5>
          {props.answer}
          {props.inviteWhen && <InviteWhenCompletion />}
          {props.dontKnowWhatToSubmit && <DontKnowWhatToSubmitCompletion />}
          {props.noFeedbackAfterEndContract && (
            <NoFeedbackAfterEndContractCompletion />
          )}
          {props.seeingFeedback && <SeeingFeedbackCompletion />}
        </h5>
      </section>
    </li>
  );
}

FaqBlueprint.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  inviteWhen: PropTypes.bool,
  dontKnowWhatToSubmit: PropTypes.bool,
  noFeedbackAfterEndContract: PropTypes.bool,
  seeingFeedback: PropTypes.bool,
};
