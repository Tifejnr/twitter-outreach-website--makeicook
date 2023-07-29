"use strict";
import axios from "axios";
import ProgressBarExecution from "../../JS functions/progressBar/ProgressBarExecution";
import { validateInput } from "../../JS functions/Utilis/Validations/Input";
import { timeIntervalSliderVal } from "../../JS functions/Utilis/Validations/sliderValidation";
import { isAnyCheckboxChecked } from "../../JS functions/Utilis/Validations/Checkbox";
import { findBoardIdByName } from "../../JS functions/Utilis/FindBoardId/byName";
import { websiteUrl } from "../../JS functions/websiteUrl";

let succes,
  failuresArray,
  totalAttemptedArray,
  totalDurationLength,
  userDetail,
  noOfCheckedCheckbox,
  userDetailsLength,
  roundIndex;

const action = "adding";
const isAddedTo = "Boards";

export default async function AddToBoards(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textAreaRef = executionParams.textAreaRefEl;
  const timeIntervalValue = Number(executionParams.timeInterval);
  const timeIntervalRef = executionParams.timeIntervalRef;
  const pageContentElRef = executionParams.pageContentElRef;
  const clientSignature = executionParams.clientSignature;

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
    }, index * noOfCheckedCheckbox * timeInterval * 1.36);
  });

  function Execution(email, boardId, boardName) {
    if (!boardName) return console.log("boardname does not exist");

    userDetail = email;
    const message = {
      email,
      boardId,
      clientSignature,
    };

    (async () => {
      const addMembersUrl = `${websiteUrl}/add`;
      try {
        const response = await axios.post(addMembersUrl, message);
        const data = response.data;

        if (data.success) return (succes += 1);
        if (data.error) {
          console.log(data.error);
          failuresArray += 1;
          if (data.error.cause.code == "ECONNRESET") {
            console.log("internet broke error");
          }
        }
      } catch (error) {
        //handling error and failures
        console.log("eror", error);

        failuresArray += 1;

        const errorObj = error.response;

        const errorMessage = errorObj.data;

        if (errorMessage.insufficientCredits) {
          console.log("Error", "insufficientCredits");
        }
        console.log(errorMessage);
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

        // console.log(
        //   totalDurationLength,
        //   totalAttemptedArray,
        //   succes,
        //   failuresArray
        // );
      }
    })();
  }
}
