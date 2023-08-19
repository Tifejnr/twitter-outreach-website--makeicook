import validateFullName from "../full-name/validateFullName";
import usernamesValidation from "../usernames/usernamesValidation";
import getMemberId from "./getMemberId";

export default async function memberIdSearch(paramsForGettingMemberIds) {
  const usernameMeans = paramsForGettingMemberIds.usernameMeans;
  const meansOfExceution = paramsForGettingMemberIds.meansOfExceution;
  const whiteSpaceRemoved = paramsForGettingMemberIds.whiteSpaceRemoved;
  const boardIdsObj = paramsForGettingMemberIds.boardIdsObj;
  const fullNamesIntoArray = paramsForGettingMemberIds.fullNamesIntoArray;
  const usernamesAtRemoved = paramsForGettingMemberIds.usernamesAtRemoved;
  const whiteSpaceEndAndBeginningRemoved =
    paramsForGettingMemberIds.whiteSpaceEndAndBeginningRemoved;
  const isUsernameInput = paramsForGettingMemberIds.isUsernameInput;
  const executionBtnClicked = paramsForGettingMemberIds.executionBtnClicked;
  const checkedBoardsObj = paramsForGettingMemberIds.boardDetailsObj;
  const action = paramsForGettingMemberIds.action;

  let itemsIntoArray,
    nameAddingObjArray = [],
    errorNameAddingObjArray = [];

  if (meansOfExceution == usernameMeans) {
    const response = usernamesValidation(whiteSpaceRemoved);
    if (response.usernameValError) return response;

    itemsIntoArray = usernamesAtRemoved;
  } else {
    const response = validateFullName(whiteSpaceEndAndBeginningRemoved);
    if (response.fullNameValError) return response;

    itemsIntoArray = fullNamesIntoArray;
  }

  // Create an array to hold promises so that all pomises are executed before moving on wt=ith the process
  const promises = itemsIntoArray.map(async (memberUsername) => {
    const memberDetailsForIdGetting = {
      memberUsername,
      boardIdsObj,
      isUsernameInput,
      checkedBoardsObj,
      action,
    };

    const getMemberIdServer = await getMemberId(memberDetailsForIdGetting);

    const memberIdFound = await getMemberIdServer;

    if (executionBtnClicked) return { stop: true }, console.log("stopped");

    if (memberIdFound.error)
      return errorNameAddingObjArray.push(memberUsername);

    const memberId = memberIdFound.memberIdFound[0].memberId;
    const nameAddingObj = {
      memberId,
      memberUsername,
      isUsernameInput,
    };

    nameAddingObjArray.push(nameAddingObj);
  });

  if (executionBtnClicked) return { stop: true };

  await Promise.all(promises);

  if (executionBtnClicked) return { stop: true };

  if (errorNameAddingObjArray.length > 0) return { errorNameAddingObjArray };

  return { nameAddingObjArray };
}
