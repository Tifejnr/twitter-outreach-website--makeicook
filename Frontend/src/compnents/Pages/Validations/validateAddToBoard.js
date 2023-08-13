import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import memberIdSearch from "./memberIdSearch/multi-boards-check";
import boardIdAndName from "./board-id-and-name/boardIdName";

const emailMeans = "Email";
const usernameMeans = "Username";
const fullNameMeans = "Full name";

let nameAddingObjArray;

export default async function validateAddToBoard(executionParams) {
  const boardIdsObj = executionParams.boardIdsObj;
  const emailInputs = executionParams.textAreaValue;
  const textareaInputs = executionParams.textAreaValue;
  const meansOfExceution = executionParams.meansOfExceution;
  const executionBtnClicked = executionParams.executionBtnClicked;

  const usernamesIntoArray = textareaInputs.split(/\s*,\s*/);
  const fullNamesIntoArray = textareaInputs.split(/\s*,\s*/);

  const usernamesAtRemoved = usernamesIntoArray.map((username) => {
    return username.slice(1);
  });

  const isUsernameInput = usernamesIntoArray.some((input) =>
    input.startsWith("@")
  );

  //validating checkbox to ensure at least one is checked
  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  //get checked boards id and their names for action in future
  const boardDetailsObj = boardIdAndName(executionParams);

  //validating if it's username means or fullname means
  if (meansOfExceution == usernameMeans || meansOfExceution == fullNameMeans) {
    const paramsForGettingMemberIds = {
      usernameMeans,
      meansOfExceution,
      textareaInputs,
      fullNamesIntoArray,
      usernamesAtRemoved,
      executionBtnClicked,
      boardIdsObj,
      isUsernameInput,
      boardDetailsObj,
    };

    const response = await memberIdSearch(paramsForGettingMemberIds);

    if (response.usernameValError) return response;
    if (response.fullNameValError) return response;
    if (response.errorNameAddingObjArray) return response;

    nameAddingObjArray = response.nameAddingObjArray;
  }

  //validating if it's email means
  if (meansOfExceution == emailMeans) {
    const response = validateInput(emailInputs);
    if (response.inputValError) return response;
  }

  const validationComplete = {
    boardDetailsObj,
    nameAddingObjArray,
  };

  return validationComplete;
}
