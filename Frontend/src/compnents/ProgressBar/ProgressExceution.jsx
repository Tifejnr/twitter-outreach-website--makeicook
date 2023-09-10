"use strict";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import getCookies from "../utilis/cookiesSetting/getCookies";

let totalDurationLength, userDetailsLength;


const emailMeans = "Email";
const nameMeans = "Name"

export default function AddToBoardsProgress(props) {
  //using useStore to manage states cause useState cant work with multiple map methods, runs into infinite loop.
  const incrementSucessLength = useStore(
    (state) => state.incrementSucessLength
  );
  const resetSucessLength = useStore((state) => state.resetSucessLength);
  const incrementTotalSucessLength = useStore(
    (state) => state.incrementTotalSucessLength
  );

  const incrementFailureLength = useStore(
    (state) => state.incrementFailureLength
  );
  const resetFailureLength = useStore((state) => state.resetFailureLength);
  const incrementTotalFailureLength = useStore(
    (state) => state.incrementTotalFailureLength
  );

  const incrementTotalAttemptLength = useStore(
    (state) => state.incrementTotalAttemptLength
  );
  const incrementCurrentRound = useStore(
    (state) => state.incrementCurrentRound
  );
  const setuserDetails = useStore((state) => state.setuserDetails);
  const setSectionName = useStore((state) => state.setSectionName);
  const pushFailureReason = useStore((state) => state.pushFailureReason);

  const executionParams = props.executionParams;
  const emailInputs = executionParams.textAreaValue;
  const boardDetailsObj = executionParams.boardDetailsObj.boardDetailsObj;
  const nameAddingObjArray = executionParams.boardDetailsObj.nameAddingObjArray;
  const stop = executionParams.stop;
  const clientSignature = executionParams.clientSignature;
  const checkboxesArray = executionParams.checkboxesArray;
  const meansOfExceution = executionParams.meansOfExceution;
  const action = executionParams.action;
  const continuousAction = executionParams.continuousAction;
  const proposition = executionParams.proposition;
  const timeIntervalValue = Number(executionParams.timeInterval);

  const noOfCheckedCheckbox = checkboxesArray.filter(
    (checkbox) => checkbox.checked
  ).length;
  const emailListSplited = emailInputs.split(",");

  const timeInterval = timeIntervalValue * 1000;

  //email means
  if (meansOfExceution == emailMeans) {
  userDetailsLength = Number(emailListSplited.length);
  totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;
    // each email execution to server
    emailListSplited.map((eachEmail, index) => {
      const email = eachEmail.trim();
      setuserDetails(email);

      setTimeout(() => {
        incrementCurrentRound();
      }, index * noOfCheckedCheckbox * timeInterval * 1.35);

      // loop through all checked boards and execute
      setTimeout(() => {
        boardDetailsObj.map((boardObj, index) => {
          const boardId = boardObj.boardId;
          let boardName = boardObj.boardName;
          if (!boardId && !boardName) return console.log("board id not found");

          resetSucessLength();
          resetFailureLength();
          setSectionName(boardName);

          const paramsForExecution = {
            email,
            boardId,
            boardName,
          };

          setTimeout(() => {
            new Execution(paramsForExecution);
          }, index * timeInterval);
        });
      }, index * noOfCheckedCheckbox * timeInterval * 1.35);
    });
  }

  //username means of execution
  if (meansOfExceution == nameMeans) {
  userDetailsLength = Number(nameAddingObjArray.length);
  totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;
    let nameDisplayed = "";
    // each name or username execution to server
    nameAddingObjArray.map((nameDetails, index) => {
      const { memberId, memberFullName,  } = nameDetails;

      setTimeout(() => {
        incrementCurrentRound();
          nameDisplayed = memberFullName;
          setuserDetails(nameDisplayed);

      }, index * noOfCheckedCheckbox * timeInterval * 1.35);

      // loop through all checked boards and execute
      setTimeout(() => {
        boardDetailsObj.map((boardObj, index) => {
          const boardId = boardObj.boardId;
          let boardName = boardObj.boardName;
          if (!boardId && !boardName) return console.log("board id not found");

          resetSucessLength();
          resetFailureLength();
          setSectionName(boardName);

          const paramsForExecution = {
            memberId,
            boardId,
            boardName,
            nameDisplayed,
          };

          setTimeout(() => {
            new Execution(paramsForExecution);
          }, index * timeInterval);
        });
      }, index * noOfCheckedCheckbox * timeInterval * 1.4);
    });
  }
  function Execution(paramsForExecution) {
    const boardName = paramsForExecution.boardName;
    const boardId = paramsForExecution.boardId;
    const memberId = paramsForExecution.memberId;
    const nameDisplayed = paramsForExecution.nameDisplayed;
    const email = paramsForExecution.email;

    let userDetail;

    if (email) {
      userDetail = email;
    }

    if (memberId) {
      userDetail = nameDisplayed;
    }

    if (!boardName) return console.log("boardname does not exist");

    const token = getCookies();
    if (!token) return { error: "No token" };

    const message = {
      token,
      email,
      boardId,
      memberId,
      clientSignature,
      creditsCharged: userDetailsLength
    };

    (async () => {
      const addMembersUrl = `${websiteUrl}/add`;
      try {
        const response = await axios.post(addMembersUrl, message);
        const data = response.data;

        if (data.success)
          return incrementSucessLength(), incrementTotalSucessLength();
        if (data.error) {
          console.log(data.error);
          incrementFailureLength();
          incrementTotalFailureLength();

          failuresArray += 1;
          if (data.error.cause.code == "ECONNRESET") {
            console.log("internet broke error");
          }
        }
      } catch (error) {
        //handling error and failures
        console.log("eror", error);
        incrementFailureLength();
        incrementTotalFailureLength();

        if (error.message == "Network Error") {
          console.log("No internet");
          const unstableInteretError = "No internet Error";
          const failedSectionName = boardName;
          const failedMemberDetails = email;

          const failureObj = {
            reason: unstableInteretError,
            failedSectionName,
            failedMemberDetails,
          };

          return (
            pushFailureReason(failureObj), console.log(unstableInteretError)
          );
        }

        const errorObj = error.response;

        const errorMessage = errorObj.data;
        if (errorMessage.trelloTokenNotFoundError) {
          console.log("Error unstable internet");
          const unstableInteretError = "Unstable Internet Error";
          const failedSectionName = boardName;
          const failedMemberDetails = userDetail;

          const failureObj = {
            reason: unstableInteretError,
            failedSectionName,
            failedMemberDetails,
          };

          return (
            pushFailureReason(failureObj), console.log(unstableInteretError)
          );
        }
        if (
          errorMessage.error.message == "Request failed with status code 429"
        ) {
          const limitReachedError = "Invite limit rached, wait 60 mins";
          const failedSectionName = boardName;
          const failedMemberDetails = userDetail;

          const failureObj = {
            reason: limitReachedError,
            failedSectionName,
            failedMemberDetails,
          };

          return pushFailureReason(failureObj), console.log(limitReachedError);
        }
     else{
          const unknownError = "Unknown Error";
          const failedSectionName = boardName;
          const failedMemberDetails = userDetail;

          const failureObj = {
            reason: unknownError,
            failedSectionName,
            failedMemberDetails,
          };
        console.log(errorMessage);
          return pushFailureReason(failureObj), console.log(unknownError);
     }

      } finally {
        setuserDetails(userDetail);
        incrementTotalAttemptLength();
        setSectionName(boardName);
      }
    })();
  }

  const additionLabelingObj = {
    action,
    continuousAction,
    proposition,
    totalDurationLength,
    totalRounds: userDetailsLength,
  };

  return (
    <ProgressBar labellingObj={additionLabelingObj} pageName="add-member" />
  );
}
