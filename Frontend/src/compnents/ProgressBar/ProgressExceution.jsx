import React, { useState, useEffect, useContext } from "react";
import ShowSuccessMess from "../../JS functions/progressBar/SucessMessage";
import { findBoardIdByName } from "../../JS functions/Utilis/FindBoardId/byName";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressBar from "./ProgressBar";

let succes, failuresArray, totalAttemptedArray, noOfCheckedCheckbox;


export default function ProgressExceution(props) {
    const [taskTitleNow , setTaskTitleNow]= useState("")
   const boardsCollection = props.executionParams.boardsCollection;
   const emailInputs = props.executionParams.textAreaValue;
   const allCheckboxes = props.executionParams.allCheckboxes;
   const checkedCheckboxesLength = props.executionParams.checkedCheckboxesLength;

  const handleTitleChange = () => {
    const title= "Adding Member Nows"
    setTaskTitleNow(title);

    console.log(taskTitleNow)
  };


  const emailListSplited = emailInputs.split(",");
  const userDetailsLength = Number(emailListSplited.length);
  // ShowSuccessMess(100, 0, action);

  totalAttemptedArray = [];

  noOfCheckedCheckbox = Number(checkedCheckboxesLength) * userDetailsLength;



  if (noOfCheckedCheckbox) {
       (<ProgressBar taskTitle={taskTitleNow}/>)
 }

  Array.from(allCheckboxes).map((checkbox, index) => {
    const checkboxEl = document.getElementById(`check${index}`);
    if (!checkboxEl.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const boardName = boardEl.innerHTML;

    const foundBoard = findBoardIdByName(boardsCollection, boardName);

    if (!foundBoard) return console.log("board not found");
    const boardId = foundBoard.id;
    

    // each email execution to server
    emailListSplited.map((eachEmail, index) => {
      const email = eachEmail;
      setTimeout(() => {
       new Execution(email, boardId);
        
      }, 4000 * index);
    });


    
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
    handleTitleChange()
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

  });
}
