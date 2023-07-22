import React, { useState, useEffect, useContext } from "react";
import ShowSuccessMess from "../../JS functions/progressBar/SucessMessage";
import { findBoardIdByName } from "../../JS functions/Utilis/FindBoardId/byName";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressBar from "./ProgressBar";

let succes, failuresArray, totalAttemptedArray, noOfCheckedCheckbox;

export default function ProgressExceution(props) {
  const [showProgressBar, setShowProgressBar] = useState(false);

  //props collections
  const [taskTitleNow, setTaskTitleNow] = useState("");
  const emailInputs = props.executionParams.textAreaValue;
  const executionObjs = props.executionParams.executionObjs;
  const checkedCheckboxesLength = props.executionParams.checkedCheckboxesLength;



  useEffect(() => {
    if (checkedCheckboxesLength) {
      // Show the ProgressBar if there are checked checkboxes
      setShowProgressBar(true);
    } else {
      // Hide the ProgressBar if there are no checked checkboxes
      setShowProgressBar(false);
    }
  }, [checkedCheckboxesLength]);

  const handleTitleChange = () => {
    const title = "Adding Member Nows";
    setTaskTitleNow(title);

    console.log(taskTitleNow);
  };

  const emailListSplited = emailInputs.split(",");
  const userDetailsLength = Number(emailListSplited.length);

  totalAttemptedArray = [];

  noOfCheckedCheckbox = Number(checkedCheckboxesLength) * userDetailsLength;

  // each email execution to server
  executionObjs.map((boardObj, index) => {
    const boardId = boardObj.boardId;
    const boarName= boardObj.boarName;
  emailListSplited.map((eachEmail, index) => {
    const email = eachEmail;
    setTimeout(() => {
      new Execution(email, boardId);
    }, 4000 * index);
  });

    })
  function Execution(email, boardId) {
    const userDetail = email.trim();
    const isAddedTo = "Boards";
    const message = {
      email,
      boardId,
    };

    succes = [];
    failuresArray = [];

    async function addMember() {
      const action = "adding";
      const response = await fetch(`${websiteUrl}/add`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(message),
      });

      totalAttemptedArray.push(1);
      handleTitleChange();
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        if (data.error.cause.code == "ECONNRESET") {
          console.log("internet broke error");
        }

        failuresArray.push(1);

        const showSuccessParams = {
          userDetail,
          isAddedTo,
          noOfCheckedCheckbox,
          successLength: succes.length,
          action,
          failuresArrayLength: failuresArray.length,
          totalAttemptedArrayLength: totalAttemptedArray.length,
        };
        //   return ShowSuccessMess(showSuccessParams);
      }

      const showSuccessParams = {
        userDetail,
        isAddedTo,
        noOfCheckedCheckbox,
        successLength: succes.length,
        action,
        failuresArrayLength: failuresArray.length,
        totalAttemptedArrayLength: totalAttemptedArray.length,
      };

      succes.push(1);
      // ShowSuccessMess(showSuccessParams);
    }
    addMember().catch((error) => {
      console.log(error);
    });
  }


   return (
    <>
      {/* Step 4: Render the ProgressBar conditionally */}
      {showProgressBar && <ProgressBar taskTitle={taskTitleNow} />}
      {/* Rest of your component's JSX */}
    </>
  );
}
