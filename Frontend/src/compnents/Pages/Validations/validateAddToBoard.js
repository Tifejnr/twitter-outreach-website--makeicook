import React from "react";
import { timeIntervalSliderVal } from "../../../JS functions/Utilis/Validations/sliderValidation";
import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import { findBoardIdByName } from "../../../JS functions/Utilis/FindBoardId/byName";

export default function validateAddToBoard(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textAreaRef = executionParams.textAreaRefEl;
  const timeIntervalValue = Number(executionParams.timeInterval);
  const timeIntervalRef = executionParams.timeIntervalRef;
  const checkboxesArray = executionParams.checkboxesArray;

  if (!validateInput(emailInputs, textAreaRef)) return false;
  if (!timeIntervalSliderVal(timeIntervalValue, timeIntervalRef))
    return console.log("slider whaala");

  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  const boardDetailsObj = checkboxesArray.map((checkbox, index) => {
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
  });

  if (!boardDetailsObj) return "";

  const validationComplete = {
    boardDetailsObj,
  };

  return validationComplete;
}
