import React, { useState,  useEffect, useContext, } from 'react';
import { ProgressBarContext } from '../compnents/Hooks/Contexts/ProgressBarContext';
import ShowSuccessMess from "./progressBar/SucessMessage";
import { validateInput } from "./Utilis/Validations/Input";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";
import { findBoardIdByName } from "./Utilis/FindBoardId/byName";
import { websiteUrl } from "./websiteUrl";

let succes, failuresArray, totalAttemptedArray, noOfCheckedCheckbox;

export default async function AddToBoard(executionParams) {
 const { progressBarTitle, 
    setProgressBarTitle,
    successStatusTitle, 
    setSuccessStatusTitle,
    failureTitle,
    setFailureTitle } = useContext(ProgressBarContext);


  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textAreaRef = executionParams.textAreaRefEl;

  const action = "adding";

  if (!validateInput(emailInputs, textAreaRef)) return console.log("Problem");

  if (!isAnyCheckboxChecked()) return console.log("Checkboxes not checked");

  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  const emailListSplited = emailInputs.split(",");
  const userDetailsLength = Number(emailListSplited.length);
  // ShowSuccessMess(100, 0, action);

  totalAttemptedArray = [];

  const checkedCheckboxesLength = document.querySelectorAll(
    ".board-checkbox:checked"
  ).length;

  noOfCheckedCheckbox = Number(checkedCheckboxesLength) * userDetailsLength;


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
  });
}

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
      return ShowSuccessMess(showSuccessParams);
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
    ShowSuccessMess(showSuccessParams);
  }
  addMember().catch((error) => {
    console.log(error);
  });
}
