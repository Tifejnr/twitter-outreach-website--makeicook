import React from "react";
import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import { findBoardIdByName } from "../../../JS functions/Utilis/FindBoardId/byName";

export default function validateAddToBoard(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textAreaRef = executionParams.textAreaRefEl;
  const checkboxesArray = executionParams.checkboxesArray;

  if (!validateInput(emailInputs, textAreaRef)) return false;
  const response = validateInput(emailInputs, textAreaRef);

  if (response.inputValError) return response;

  if (!response) return console.log("stop");

  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  const boardDetailsObj = checkboxesArray.map((checkbox, index) => {
    if (!checkbox.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const boardName = boardEl.textContent;

    const foundBoard = findBoardIdByName(boardsCollection, boardName);

    if (!foundBoard) return console.log("board not found");
    const boardId = foundBoard.id;

    const neededObj = {
      boardId,
      boardName,
    };

    return neededObj;
  });

  if (!boardDetailsObj) return "";

  const validationComplete = {
    boardDetailsObj,
  };

  return validationComplete;
}
