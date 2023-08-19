import validateFullName from "../full-name/validateFullName";
import usernamesValidation from "../usernames/usernamesValidation";
import { findMemberIdByName } from "./findByName";
import { findMemberIdByUsername } from "./findByUsername";

export default async function memberIdSearch(paramsForGettingMemberIds) {
  const usernameMeans = paramsForGettingMemberIds.usernameMeans;
  const meansOfExceution = paramsForGettingMemberIds.meansOfExceution;
  const whiteSpaceRemoved = paramsForGettingMemberIds.whiteSpaceRemoved;
  const fullNamesIntoArray = paramsForGettingMemberIds.fullNamesIntoArray;
  const usernamesAtRemoved = paramsForGettingMemberIds.usernamesAtRemoved;
  const whiteSpaceEndAndBeginningRemoved =
    paramsForGettingMemberIds.whiteSpaceEndAndBeginningRemoved;
  const isUsernameInput = paramsForGettingMemberIds.isUsernameInput;
  const allUserMemberDetail = paramsForGettingMemberIds.allUserMemberDetail;
  const executionBtnClicked = paramsForGettingMemberIds.executionBtnClicked;

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
    let memberIdFound;

    if (isUsernameInput) {
      memberIdFound = findMemberIdByUsername(
        allUserMemberDetail,
        memberUsername
      );
    } else {
      memberIdFound = findMemberIdByName(allUserMemberDetail, memberUsername);
    }

    if (!memberIdFound) return errorNameAddingObjArray.push(memberUsername);

    const memberId = memberIdFound.id;

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
