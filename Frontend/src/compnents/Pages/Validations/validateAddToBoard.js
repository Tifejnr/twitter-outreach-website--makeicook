import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import { findBoardIdByName } from "../../../JS functions/Utilis/FindBoardId/byName";
import usernamesValidation from "./usernames/usernamesValidation";
import validateFullName from "./full-name/validateFullName";
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

  const usernamesIntoArray = textareaInputs.split(/\s*,\s*/);
  const fullNamesIntoArray = textareaInputs.split(/\s*,\s*/);
  const usernamesAtRemoved = usernamesIntoArray.map((username) => {
    return username.slice(1);
  });
  const isUsernameInput = usernamesIntoArray.some((input) =>
    input.startsWith("@")
  );

  //validating checkbox
  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  let nameAddingObjArray = [];

  //validating if it's username means or fullname means
  if (meansOfExceution == usernameMeans || meansOfExceution == fullNameMeans) {
    let itemsIntoArray;
    if (meansOfExceution == usernameMeans) {
      const response = usernamesValidation(textareaInputs);
      if (response.usernameValError) return response;
      itemsIntoArray = usernamesAtRemoved;
    } else {
      const response = validateFullName(textareaInputs);
      if (response.fullNameValError) return response;
      itemsIntoArray = fullNamesIntoArray;
    }

    nameAddingObjArray = [];
    // Create an array to hold promises
    const promises = itemsIntoArray.map(async (memberUsername) => {
      const memberDetailsForIdGetting = {
        memberUsername,
        boardIdsObj,
        isUsernameInput,
      };

      const getMemberIdServer = await getMemberIdByUsername(
        memberDetailsForIdGetting
      );

      const memberIdFound = await getMemberIdServer;

      if (memberIdFound.error) return console.log("member not found");

      const memberId = memberIdFound.memberIdFound[0].memberId;
      const nameAddingObj = {
        memberId,
        memberUsername,
        isUsernameInput,
      };

      nameAddingObjArray.push(nameAddingObj);
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
    nameAddingObjArray,
  };

  return validationComplete;
}
