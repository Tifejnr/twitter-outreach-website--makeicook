"use strict";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";

let totalDurationLength, userDetailsLength

const action = "adding";
const isAddedTo = "Boards";

const emailMeans = "Email";
const usernameMeans= "Username"
const fullNameMeans= "Fullname"

export default function AddToBoardsProgress(props) {
  //using useStore to manage states cause useState cant work with multiple map methods, runs into infinite loop.
  const incrementSucessLength = useStore(
    (state) => state.incrementSucessLength
  );
  const resetSucessLength = useStore((state) => state.resetSucessLength);
  const incrementTotalSucessLength = useStore((state) => state.incrementTotalSucessLength);

  const incrementFailureLength = useStore(
    (state) => state.incrementFailureLength
  );
  const resetFailureLength = useStore((state) => state.resetFailureLength);
  const incrementTotalFailureLength = useStore((state) => state.incrementTotalFailureLength);


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
  const boardDetailsObj = executionParams.boardDetailsObj.boardDetailsObj
  const usernameAddingObjArray = executionParams.boardDetailsObj.usernameAddingObjArray
  const clientSignature = executionParams.clientSignature;
  const checkboxesArray = executionParams.checkboxesArray;
  const meansOfExceution = executionParams.meansOfExceution;
  const timeIntervalValue = Number(executionParams.timeInterval);

  console.log(usernameAddingObjArray)


  const noOfCheckedCheckbox = checkboxesArray.filter(
    (checkbox) => checkbox.checked
  ).length;
  const emailListSplited = emailInputs.split(",");

  userDetailsLength = Number(emailListSplited.length);
  totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;


  const timeInterval = timeIntervalValue * 1000;
if (meansOfExceution==emailMeans) {
  // each email execution to server
  emailListSplited.map((eachEmail, index) => {
    const email = eachEmail.trim();
    setuserDetails(email);

    setTimeout(() => {
     incrementCurrentRound() 
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);

    // loop through all checked boards and execute
    setTimeout(() => {
      boardDetailsObj.map((boardObj, index) => {
        const boardId = boardObj.boardId;
        let boardName = boardObj.boardName;
        if (!boardId && !boardName) return console.log("board id not found");

         resetSucessLength()
         resetFailureLength()
         setSectionName(boardName);

        setTimeout(() => {
          new Execution(email, boardId, boardName);
        }, index * timeInterval);
      });
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);
  });
}

//username means of execution
if (meansOfExceution==usernameMeans) {
  // each email execution to server
  usernameAddingObjArray.map((usernameDetails, index) => {
    const {memberId, memberUsername}= usernameDetails;
    setuserDetails(memberUsername);

    setTimeout(() => {
     incrementCurrentRound() 
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);

    // loop through all checked boards and execute
    setTimeout(() => {
      boardDetailsObj.map((boardObj, index) => {
        const boardId = boardObj.boardId;
        let boardName = boardObj.boardName;
        if (!boardId && !boardName) return console.log("board id not found");

         resetSucessLength()
         resetFailureLength()
         setSectionName(boardName);

        setTimeout(() => {
          new Execution(memberId, boardId, boardName);
        }, index * timeInterval);
      });
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);
  });
}
  function Execution(email, boardId, boardName) {
    if (!boardName) return console.log("boardname does not exist");

    const message = {
      email,
      boardId,
      memberId,
      clientSignature,
    };

    (async () => {
      const addMembersUrl = `${websiteUrl}/add`;
      try {
        const response = await axios.post(addMembersUrl, message);
        const data = response.data;

        if (data.success) return ( incrementSucessLength(), incrementTotalSucessLength());
        if (data.error) {
          console.log(data.error);
         incrementFailureLength();
        incrementTotalFailureLength()

          failuresArray += 1;
          if (data.error.cause.code == "ECONNRESET") {
            console.log("internet broke error");
          }
        }
      } catch (error) {
        //handling error and failures
        console.log("eror", error);
        incrementFailureLength();
        incrementTotalFailureLength()
        
       if (error.message=="Network Error") {
             console.log("No internet")
          const unstableInteretError = "No internet Error"
          const failedSectionName= boardName;
          const failedMemberDetails= email;
        
           const failureObj = {
             reason: unstableInteretError,
             failedSectionName,
            failedMemberDetails
         }
        
      return (pushFailureReason(failureObj), console.log(unstableInteretError)) ;
    }

        const errorObj = error.response;

        const errorMessage = errorObj.data;
        if (errorMessage.trelloTokenNotFoundError) {
          console.log("Error unstable internet")
          const unstableInteretError = "Unstable Internet Error"
          const failedSectionName= boardName;
          const failedMemberDetails= email;

          const failureObj = {
              reason: unstableInteretError,
              failedSectionName,
              failedMemberDetails
          }

       return (pushFailureReason(failureObj), console.log(unstableInteretError)) ;

        }
        if (errorMessage.error.message == "Request failed with status code 429") {
          const limitReachedError = "Invite limit rached, wait 60 mins"
          const failedSectionName= boardName;
          const failedMemberDetails= email;

          const failureObj = {
              reason: limitReachedError,
              failedSectionName,
              failedMemberDetails
          }

       return (pushFailureReason(failureObj), console.log(limitReachedError)) ;
      }

        console.log(errorMessage);
      } finally {
        incrementTotalAttemptLength();
        setSectionName(boardName);
        setuserDetails(email);

      }
    })();
  }


  return <ProgressBar pageName="add-member" totalDurationLength={totalDurationLength} 
  
  totalRounds={userDetailsLength } />;
}
