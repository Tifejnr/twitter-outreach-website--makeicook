import React, { useEffect, useState, useContext } from "react";
import { ProgressBarContext } from "../Hooks/Contexts/ProgressBarContext";
import AddToBoards from "../Pages/AddToBoards";
import useStore from "../Hooks/Zustand/usersStore";

export default function ProgressBar(props) {
  return (
    <div className="loading" id="loading">
      <div className="barHolder">
        <div id="bar"></div>
      </div>
      <section className="changing-ele-on-bar">
        <h2 id="progressBarTitle" className="title"></h2>
        <h2 id="totalRoundsEl" className="title"></h2>
        <h2 id="noOfRounds" className="title"></h2>
        <h3 id="successStatusTitle" className="title successTitle"></h3>
        <h3 id="failureTitle" className="title failureTitle"></h3>
        <h3 id="completedStatus" className="title"></h3>
      </section>
      <section className="btn-section" id="btnSection">
        <a href={`/${props.pageName}`}>
          {" "}
          <button className="okay-btn" id="okay">
            Okay
          </button>
        </a>
        <a href={`/${props.pageName}`}>
          <button className="cancel-btn" id="cancelBtn">
            Cancel
          </button>
        </a>
      </section>
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
