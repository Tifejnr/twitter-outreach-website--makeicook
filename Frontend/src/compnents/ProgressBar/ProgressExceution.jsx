import React, { useState, useEffect, useContext } from "react";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressBar from "./ProgressBar";

let totalAttemptedArray,
  userDetailsLength,
  totalDurationLength,
  successLength

const action = "Addition";
const actionTitle = "Adding";
const section = "boards";
const pageName = "add-member";

export default function ProgressExceution(props) {
  const [userDetail, setUserDetail] = useState("");
  const [failuresLength, setFailuresLength] = useState(0);
  const [sucessLength, setSucessLength] = useState(0);
  const [totalAttemptedLength, setTotalAttemptedLength] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  //props collections
  const emailInputs = props.executionParams.textAreaValue;
  const executionObjs = props.executionParams.executionObjs;
  const checkedCheckboxesLength = props.executionParams.checkedCheckboxesLength;

  const settingProgress = (showProgressToUserObj) => {
    // Initialize successLength and failuresLength to 0 when setting progress
    let successLength = 0;
    let failuresLength = 0;

    const userDetailNow = showProgressToUserObj.userDetail;
    const totalAttemptedArrayLength = showProgressToUserObj.totalAttemptedArrayLength;
    const percentLoaded = showProgressToUserObj.percentLoaded;

    setFailuresLength(failuresLength);
    setSucessLength(successLength);
    setUserDetail(userDetailNow);
    setTotalAttemptedLength(totalAttemptedArrayLength);
    setBarWidth(percentLoaded);
  };

  const emailListSplited = emailInputs.split(",");
  userDetailsLength = Number(emailListSplited.length);

  totalAttemptedArray = [];
  totalDurationLength = Number(checkedCheckboxesLength) * userDetailsLength;

  // Loop through all boards to get their Id and names
  executionObjs.map((boardObj, index) => {
    const boardId = boardObj.boardId;
    const boardName = boardObj.boarName;

    //Loop through all email and add them to all the boards
    emailListSplited.map((eachEmail, index) => {
      const email = eachEmail;
      // setTimeout(() => {
      new Execution(email, boardId);
      // }, 4000 * index);
    });
  });

  function Execution(email, boardId) {
    const userDetail = email.trim();
    const message = {
      email,
      boardId,
    };

    async function addMember() {
      const response = await fetch(`${websiteUrl}/add`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(message),
      });

      totalAttemptedArray.push(1);
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        if (data.error.cause.code == "ECONNRESET") {
          console.log("internet broke error");
        }

        // Increment failuresLength and update progress
        failuresLength += 1;
        settingProgress(getProgressData());
      }

      // Increment successLength and update progress
      successLength += 1;
      settingProgress(getProgressData());
    }

    addMember().catch((error) => {
      console.log(error);
    });
  }

  // Helper function to get progress data
  function getProgressData() {
    const showProgressToUserObj = {
      userDetail,
      percentLoaded: (Number(totalAttemptedLength) / Number(totalDurationLength)) * 100,
      successLength,
      failuresArrayLength: failuresLength,
      totalAttemptedArrayLength: totalAttemptedArray.length,
    };

    return showProgressToUserObj;
  }

  console.log(barWidth);

  const objToBar = {
    action,
    actionTitle,
    section,
    userDetail,
    userDetailsLength,
    pageName,
    failuresLength,
    sucessLength,
    checkedCheckboxesLength,
    barWidth,
  };

  return <ProgressBar progressProps={objToBar} />;
}
