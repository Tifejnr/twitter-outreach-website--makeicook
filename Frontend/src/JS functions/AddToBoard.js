"use strict";

import ProgressBarExecution from "./progressBar/ProgressBarExecution";
import { validateInput } from "./Utilis/Validations/Input";
import { timeIntervalSliderVal } from "./Utilis/Validations/sliderValidation";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";
import { findBoardIdByName } from "./Utilis/FindBoardId/byName";
import { websiteUrl } from "./websiteUrl";

let succes,
  failuresArray,
  totalAttemptedArray,
  totalDurationLength,
  userDetail,
  noOfCheckedCheckbox,
  userDetailsLength,
  roundIndex;

let showSuccessParams = {};
const action = "adding";
const isAddedTo = "boards";

export default async function AddToBoards(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textAreaRef = executionParams.textAreaRefEl;
  const timeIntervalValue = Number(executionParams.timeInterval);
  const timeIntervalRef = executionParams.timeIntervalRef;
  const pageContentElRef = executionParams.pageContentElRef;

  if (!validateInput(emailInputs, textAreaRef)) return false;
  if (!timeIntervalSliderVal(timeIntervalValue, timeIntervalRef))
    return console.log("slider whaala");

  if (!isAnyCheckboxChecked()) return false;

  const allCheckboxesOnPage = document.querySelectorAll(".board-checkbox");

  noOfCheckedCheckbox = document.querySelectorAll(
    ".board-checkbox:checked"
  ).length;

  const emailListSplited = emailInputs.split(",");

  userDetailsLength = Number(emailListSplited.length);
  totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;

  const boardDetailsObj = Array.from(allCheckboxesOnPage).map(
    (checkbox, index) => {
      if (!checkbox.checked) return false;

      const checkboxId = checkbox.id;

      const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

      const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

      const boardName = boardEl.innerHTML;

      const foundBoard = findBoardIdByName(boardsCollection, boardName);

      if (!foundBoard) return console.log("board not found");
      const boardId = foundBoard.id;

      const neededObj = {
        boardId,
        boardName,
      };

      return neededObj;
    }
  );

  if (!boardDetailsObj) return "";

  pageContentElRef.classList.add("blurred");
  const timeInterval = timeIntervalValue * 1000;

  totalAttemptedArray = 0;
  // each email execution to server
  emailListSplited.map((eachEmail, index) => {
    const email = eachEmail.trim();
    roundIndex = index + 1;

    setTimeout(() => {
      roundIndex = index + 1;
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);

    if (totalAttemptedArray === 0) {
      let boardName = "...";
      userDetail = "...";
      succes = 0;
      failuresArray = 0;
      roundIndex = 1;

      let showSuccessParams = {
        userDetail,
        boardName,
        isAddedTo,
        noOfCheckedCheckbox,
        succes,
        action,
        failuresArray,
        totalAttemptedArray,
        totalDurationLength,
        roundIndex,
        userDetailsLength,
      };

      ProgressBarExecution(showSuccessParams);
    }
    //loop through all checked boards
    setTimeout(() => {
      boardDetailsObj.map((boardObj, index) => {
        const boardId = boardObj.boardId;
        let boardName = boardObj.boardName;
        if (!boardId && !boardName) return console.log("board id not found");
        succes = 0;
        failuresArray = 0;
        setTimeout(() => {
          new Execution(email, boardId, boardName);
        }, index * timeInterval);
      });
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);
  });

  function Execution(email, boardId, boardName) {
    if (!boardName) return console.log("boardname does not exist");

    console.log(boardName, roundIndex);

    userDetail = email;
    const message = {
      email,
      boardId,
    };

    (async () => {
      try {
        const response = await fetch(`${websiteUrl}/add`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(message),
        });

        const data = await response.json();
        if (data.error) {
          console.log(data);
          failuresArray += 1;
          if (data.error.cause.code == "ECONNRESET") {
            console.log("internet broke error");
          }
        }

        console.log(data);

        succes += 1;
      } catch (error) {
        console.log(error);
      } finally {
        totalAttemptedArray += 1;

        let showSuccessParams = {
          userDetail,
          boardName,
          isAddedTo,
          noOfCheckedCheckbox,
          userDetailsLength,
          succes,
          action,
          failuresArray,
          totalAttemptedArray,
          totalDurationLength,
          roundIndex,
        };

        ProgressBarExecution(showSuccessParams);

        console.log(
          totalDurationLength,
          totalAttemptedArray,
          succes,
          failuresArray
        );
      }
    })();
  }
}
