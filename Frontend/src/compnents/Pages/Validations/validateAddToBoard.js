import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import { findBoardIdByName } from "../../../JS functions/Utilis/FindBoardId/byName";
import usernamesValidation from "./usernames/usernamesValidation";
import getMemberIdByUsername from "./usernames/getMemberIdByUsername";

const emailMeans = "Email";
const usernameMeans = "Username";
const fullNameMeans = "Fullname";

export default function validateAddToBoard(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textareaInputs = executionParams.textAreaValue;
  const checkboxesArray = executionParams.checkboxesArray;
  const meansOfExceution = executionParams.meansOfExceution;

  //validating if it's username
  if (meansOfExceution == usernameMeans) {
    const response = usernamesValidation(textareaInputs);
    if (response.usernameValError) return response;
  }

  //validating if it's email entered
  if (meansOfExceution == emailMeans) {
    const response = validateInput(emailInputs);
    if (response.inputValError) return response;
  }

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
