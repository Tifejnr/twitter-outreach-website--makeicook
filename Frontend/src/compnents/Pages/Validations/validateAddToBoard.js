import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import memberIdSearch from "./memberIdSearch/multi-boards-check";
import boardIdAndName from "./board-id-and-name/boardIdName";

const emailMeans = "Email";
let nameAddingObjArray;

export default async function validateAddToBoard(executionParams) {
  const boardIdsObj = executionParams.boardIdsObj;
  const textareaInputs = executionParams.textAreaValue;
  const meansOfExceution = executionParams.meansOfExceution;
  const executionBtnClicked = executionParams.executionBtnClicked;
  const allUserMemberDetail = executionParams.allUserMemberDetail;

  //remove whitespaces from if it's email
  const whiteSpaceRemoved = textareaInputs.replace(/ /g, "");

  //validating if it's email means
  if (meansOfExceution == emailMeans) {
    const response = validateInput(whiteSpaceRemoved);
    if (response.inputValError) return response;
  }

  //validating checkbox to ensure at least one is checked
  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  //get checked boards id and their names for action in future
  const boardDetailsObj = boardIdAndName(executionParams);

  const paramsForGettingMemberIds = {
    usernameMeans,
    meansOfExceution,
    textareaInputs,
    whiteSpaceRemoved,
    whiteSpaceEndAndBeginningRemoved,
    fullNamesIntoArray,
    usernamesAtRemoved,
    executionBtnClicked,
    boardIdsObj,
    allUserMemberDetail,
    isUsernameInput,
    boardDetailsObj,
  };

  const response = await memberIdSearch(paramsForGettingMemberIds);

  nameAddingObjArray = response.nameAddingObjArray;

  const validationComplete = {
    boardDetailsObj,
    nameAddingObjArray,
  };

  return validationComplete;
}
