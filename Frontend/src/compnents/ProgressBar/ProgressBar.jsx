import React, { useEffect, useState, useContext } from "react";
import useStore from "../Hooks/Zustand/usersStore";
import FailureDetails from "./FailureDetails";
import failureToggleIcon from "../../assets/SVGs/failure-toggle.svg";
import successToggleIcon from "../../assets/SVGs/faq-toggle-icon.svg"

export default function ProgressBar(props) {
  const failureLength = useStore((state) => state.failureLength);
  const totalFailureLength = useStore((state) => state.totalFailureLength);
  const sucessLength = useStore((state) => state.sucessLength);
  const totalSucessLength = useStore((state) => state.totalSucessLength);
  const userDetails = useStore((state) => state.userDetails);
  const sectionName = useStore((state) => state.sectionName);
  const totalAttemptLength = useStore((state) => state.totalAttemptLength);
  const currentRound = useStore((state) => state.currentRound);
  const failureReason = useStore((state) => state.failureReason);
  const [isClicked, setIsClicked] = useState(false);

  //props from execution
  const labellingObj= props.labellingObj
  const totalDurationLength = labellingObj.totalDurationLength;
  const totalRounds = labellingObj.totalRounds;
  const continuousAction = labellingObj.continuousAction;
  const action = labellingObj.action;
  const proposition = labellingObj.proposition;

  const handleToggle = () => {
    setIsClicked((prevState) => !prevState);
  };

  const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)",
  };
  const expandFailureDetails = {
    overflow: isClicked && "visible",
    maxHeight : isClicked && "100vh"
  };

  let percentLoaded =
    (Number(totalAttemptLength) / Number(totalDurationLength)) * 100;

  let updateBarWidth = {
    width: `${percentLoaded}%`,
    aimation: percentLoaded == 100 && "none",
  };

  return (
    <div className="loading" id="loading">
     { isClicked? "" : <div
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
  }
    <section >

      {isClicked? "" : <section className="changing-ele-on-bar">
        <h2 id="progressBarTitle" className="title">
          {percentLoaded == 100
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

        {percentLoaded != 100 && (
          <h2 id="noOfRounds" className="title">
            {continuousAction} Member {totalRounds >1 && currentRound}, {userDetails}
          </h2>
        )}
        {percentLoaded == 100 ? (
          <h3 id="successStatusTitle" className="title successTitle">
             Total Successfull {action}s: {totalSucessLength}
          </h3>
        ) : (
          <h3 id="successStatusTitle" className="title successTitle">
              Member {totalRounds >1 && currentRound} Successfull {action}s: {sucessLength}
          </h3>
        )}
        {percentLoaded == 100 ? (
          <h3 id="failureTitle" className="title failureTitle">
            Total Failed {action}s: {totalFailureLength}
          </h3>
        ) : (
          <h3 id="failureTitle" className="title failureTitle">
           Member {totalRounds >1 && currentRound} Failed {action}s: {failureLength}
          </h3>
        )}
    </section>     
    }  
     {failureReason.length > 0 && (
          <section className="failureReasonsDisplay" style={expandFailureDetails}>
            <h3
              title="Click to see details"
              onClick={handleToggle}
              className="title failureReasonsDisplayTitle">
             { isClicked ? <button title="close" className="back-to-progress-btn">Close</button> : "See Failure Details" }
              { isClicked ? "" :  <img
                style={rotateOnToggle}
                src={failureToggleIcon}
                alt="failure toggle icon"
              />
                  }
            </h3>

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

    {percentLoaded > 0 && !isClicked && <h3 className="title">Credit Charged: 1</h3>}

      </section>

      { isClicked? "" : <section className="btn-section" id="btnSection">
        
        {percentLoaded == 100 ? (
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
  }
    </div>
  );
}

// function ProgressBarExecution(progressBarParams) {

//   const userDetail= progressBarParams.userDetail
//   const isAddedTo = progressBarParams.isAddedTo
//   const noOfCheckedCheckbox= progressBarParams.noOfCheckedCheckbox
//   const successLength= progressBarParams.successLength + 1
//   const action= progressBarParams.action
//   let failuresArrayLength= progressBarParams.failuresArrayLength
//   const totalAttemptedArrayLength= progressBarParams.totalAttemptedArrayLength

// if (failuresArrayLength==undefined) {
//   failuresArrayLength= 0
//  }

// const progressBarTitle = document.getElementById("progressBarTitle");
// const successStatusTitle = document.getElementById("successStatusTitle");
// const failureTitle = document.getElementById("failureTitle");
// const mainContentCont = document.getElementById("mainContentCont");
// const BAR = document.getElementById("bar");
// const progressBarContainer = document.getElementById("loading");
// const allForms = document.getElementsByTagName("form");
// progressBarTitle.innerHTML=""

// if (action =="deleting") {
//   progressBarTitle.innerHTML = `Deleting ${userDetail} from ${noOfCheckedCheckbox} Boards... `;
//   successStatusTitle.innerHTML = `Successful ${isAddedTo} Deletions: ${successLength}`;
//   failureTitle.innerHTML = `Failed Deletions: ${failuresArrayLength}`;
// }

// if (action=="adding") {
//   progressBarTitle.innerHTML = `Adding ${userDetail} to ${noOfCheckedCheckbox} Boards... `;
//   successStatusTitle.innerHTML = `Successful ${isAddedTo} Additions: ${successLength}`;
//   failureTitle.innerHTML = `Failed Additions: ${failuresArrayLength}`;

// }
//   hide(mainContentCont);
//   hideForms(allForms);
//   display(progressBarContainer);
//   display(btnSection);

//   let percentLoaded = (Number(totalAttemptedArrayLength) / Number(noOfCheckedCheckbox)) * 100;

//   BAR.style.width = percentLoaded + "%";
// }
