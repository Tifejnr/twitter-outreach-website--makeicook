import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import { findBoardIdByName } from "../../../JS functions/Utilis/FindBoardId/byName";
import usernamesValidation from "./usernames/usernamesValidation";
import getMemberIdByUsername from "./usernames/getMemberIdByUsername";

const emailMeans = "Email";
const usernameMeans = "Username";
const fullNameMeans = "Fullname";

export default async function validateAddToBoard(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const boardIdsObj = executionParams.boardIdsObj;
  const emailInputs = executionParams.textAreaValue;
  const textareaInputs = executionParams.textAreaValue;
  const checkboxesArray = executionParams.checkboxesArray;
  const meansOfExceution = executionParams.meansOfExceution;

  //validating checkbox

  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  let usernameAddingObjArray = [];
  //validating if it's username
  if (meansOfExceution == usernameMeans) {
    const response = usernamesValidation(textareaInputs);
    if (response.usernameValError) return response;

    const usernameSplitted = textareaInputs.split(",");

    usernameAddingObjArray = [];
    // Create an array to hold promises
    const promises = usernameSplitted.map(async (memberUsername) => {
      const getMemberIdServer = await getMemberIdByUsername(
        memberUsername,
        boardIdsObj
      );

      const memberIdFound = await getMemberIdServer;

      if (memberIdFound.error) return console.log("member not found");

      const memberId = memberIdFound.memberIdFound[0].memberId;
      const usernameAddingObj = {
        memberId,
        memberUsername,
      };

      usernameAddingObjArray.push(usernameAddingObj);
    });

    await Promise.all(promises);
  }

  //validating if it's email means entered
  if (meansOfExceution == emailMeans) {
    const response = validateInput(emailInputs);
    if (response.inputValError) return response;
  }

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
    usernameAddingObjArray,
  };

  return validationComplete;
}
