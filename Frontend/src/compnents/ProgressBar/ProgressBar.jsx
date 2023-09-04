// Import necessary dependencies and components from external files and libraries
import React, { useEffect, useState, useContext } from "react";
import useStore from "../Hooks/Zustand/usersStore";
import FailureDetails from "./FailureDetails";
import failureToggleIcon from "../../assets/SVGs/failure-toggle.svg";


// Define the ProgressBar component
export default function ProgressBar(props) {
  // Retrieve various state variables from the custom hook 'useStore'
  const failureLength = useStore((state) => state.failureLength);
  const totalFailureLength = useStore((state) => state.totalFailureLength);
  const sucessLength = useStore((state) => state.sucessLength);
  const totalSucessLength = useStore((state) => state.totalSucessLength);
  const userDetails = useStore((state) => state.userDetails);
  const sectionName = useStore((state) => state.sectionName);
  const totalAttemptLength = useStore((state) => state.totalAttemptLength);
  const currentRound = useStore((state) => state.currentRound);
  const failureReason = useStore((state) => state.failureReason);

  // Define a local state variable 'isClicked' and its updater function 'setIsClicked'
  const [isClicked, setIsClicked] = useState(false);

  // Extract 'labellingObj' and its properties from the 'props' object
  const labellingObj = props.labellingObj;
  const totalDurationLength = labellingObj.totalDurationLength;
  const totalRounds = labellingObj.totalRounds;
  const continuousAction = labellingObj.continuousAction;
  const action = labellingObj.action;
  const proposition = labellingObj.proposition;

  // Function to toggle the 'isClicked' state
  const handleToggle = () => {
    setIsClicked((prevState) => !prevState);
  };

  // CSS styles for rotating an icon and expanding a section based on 'isClicked' state
  const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)",
  };
  const expandFailureDetails = {
    overflow: isClicked && "visible",
    maxHeight: isClicked && "100vh",
  };

  // Calculate the percentage of loading progress
  let percentLoaded = (Number(totalAttemptLength) / Number(totalDurationLength)) * 100;

  // CSS style to update the width of the progress bar and disable animation when 100% loaded
  let updateBarWidth = {
    width: `${percentLoaded}%`,
    animation: percentLoaded === 100 && "none",
  };

  // Render the JSX for the ProgressBar component
  return (
    <div className="loading" id="loading">
      {isClicked ? (
        ""
      ) : (
        <div
          className={`barHolder ${
            percentLoaded < 100 ? "moveFlame-animation" : ""
          }`}>
          <p>{Math.round(percentLoaded)}%</p>
          <div
            className={`progressing-bar ${
              percentLoaded < 100 ? "moveFlame-animation" : ""
            }`}
            style={updateBarWidth}></div>
        </div>
      )}
      <section>
        {isClicked ? (
          ""
        ) : (
          <section className="changing-ele-on-bar">
            {/* Render various pieces of information based on loading progress */}
            <h2 id="progressBarTitle" className="title">
              {percentLoaded === 100
                ? `${action} ${proposition} Boards Completed`
                : `${continuousAction} ${userDetails} ${proposition} ${sectionName}`}
            </h2>

            <h2 id="totalRoundsEl" className="title">
              {percentLoaded === 100
                ? totalRounds === 1
                  ? ` ${userDetails} ${action} Completed`
                  : ` ${totalRounds} Members ${action} Completed`
                : totalRounds === 1
                ? `${continuousAction} ${totalRounds} Member...`
                : `${continuousAction} ${totalRounds} Members...`}
            </h2>

            {percentLoaded !== 100 && (
              <h2 id="noOfRounds" className="title">
                {`${continuousAction} Member ${totalRounds > 1 && currentRound}, ${userDetails}`}
              </h2>
            )}
            {percentLoaded === 100 && totalSucessLength === 0 ? (
              <h3 id="successStatusTitle" className="title successTitle">
                You may not be authorized to remove this type of member
              </h3>
            ) : percentLoaded === 100 ? (
              <h3 id="successStatusTitle" className="title successTitle">
                Total Successful {action}s: {totalSucessLength}
              </h3>
            ) : (
              <h3 id="successStatusTitle" className="title successTitle">
                Member {totalRounds > 1 && currentRound} Successful {action}s: {sucessLength}
              </h3>
            )}

            {percentLoaded === 100 ? (
              <h3 id="failureTitle" className="title failureTitle">
                Total Failed {action}s: {totalFailureLength}
              </h3>
            ) : (
              <h3 id="failureTitle" className="title failureTitle">
                Member {totalRounds > 1 && currentRound} Failed {action}s: {failureLength}
              </h3>
            )}
          </section>
        )}
        {/* Render failure details if available */}
        {failureReason.length > 0 && (
          <section
            className="failureReasonsDisplay"
            style={expandFailureDetails}>
            <h3
              title="Click to see details"
              onClick={handleToggle}
              className="title failureReasonsDisplayTitle">
              {isClicked ? (
                <button title="close" className="back-to-progress-btn">
                  Close
                </button>
              ) : (
                "See Failure Details"
              )}
              {isClicked ? (
                ""
              ) : (
                <img
                  style={rotateOnToggle}
                  src={failureToggleIcon}
                  alt="failure toggle icon"
                />
              )}
            </h3>

            {/* Map and render individual failure details */}
            {failureReason.map((failureObj, index) => (
              <FailureDetails
                key={index}
                failureObj={failureObj}
                failureToggleIcon={failureToggleIcon}
                isClicked={isClicked}
                proposition={proposition}
              />
            ))}
          </section>
        )}

        {/* Render credit charged information if loading progress is greater than 0 and not clicked */}
        {percentLoaded > 0 && !isClicked && (
          <h3 className="title">Credit Charged: {totalRounds}</h3>
        )}
      </section>

      {isClicked ? (
        ""
      ) : (
        <section className="btn-section" id="btnSection">
          {/* Render different buttons based on loading progress */}
          {percentLoaded === 100 ? (
            <a href={`/${props.pageName}`}>
              <button className="okay-btn progressbar-btn" id="okay">
                Okay
              </button>
            </a>
          ) : (
            <a href={`/${props.pageName}`}>
              <button className="cancel-btn progressbar-btn" id="cancelBtn">
                Cancel
              </button>
            </a>
          )}
        </section>
      )}
    </div>
  );
}
