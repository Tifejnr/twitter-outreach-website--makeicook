"use strict";
import axios from "axios";
import ProgressBar from "./ProgressBar";
// import ProgressBarExecution from "../../JS functions/progressBar/ProgressBarExecution";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";

let succes,
  failuresArray,
  totalAttemptedArray,
  totalDurationLength,
  userDetail,
  noOfCheckedCheckbox,
  userDetailsLength,
  roundIndex;

const action = "adding";
const isAddedTo = "Boards";

export default function AddToBoardsProgress(props) {
  const incrementSucessLength = useStore((state) => state.incrementSucessLength);
  const incrementFailureLength = useStore((state) => state.incrementFailureLength);
  const incrementTotalAttemptLength = useStore((state) => state.incrementTotalAttemptLength);
  const setuserDetails = useStore((state) => state.setuserDetails);
  const setSectionName = useStore((state) => state.setSectionName);


  const executionParams= props.executionParams
  const emailInputs = executionParams.textAreaValue;
  const boardDetailsObj = executionParams.boardDetailsObj;
  const clientSignature = executionParams.clientSignature;
  const checkboxesArray = executionParams.checkboxesArray;
  const timeIntervalValue = Number(executionParams.timeInterval);


   noOfCheckedCheckbox = checkboxesArray.filter(
    (checkbox) => checkbox.checked
  ).length;
  const emailListSplited = emailInputs.split(",");

  userDetailsLength = Number(emailListSplited.length);
  totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;


  const timeInterval = timeIntervalValue * 1000;

  totalAttemptedArray = 0;
  // each email execution to server
  emailListSplited.map((eachEmail, index) => {
    const email = eachEmail.trim();
    setuserDetails(email)
    roundIndex = index + 1;

    setTimeout(() => {
      roundIndex = index + 1;
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);

    if (totalAttemptedArray === 0) {
      let boardName = "...";
      userDetail = "...";
      succes = 0;
      failuresArray = 0;
      roundIndex = 1;

      let showSuccessParams = {
        userDetail,
        boardName,
        isAddedTo,
        noOfCheckedCheckbox,
        succes,
        action,
        failuresArray,
        totalAttemptedArray,
        totalDurationLength,
        roundIndex,
        userDetailsLength,
      };

    }
    //loop through all checked boards
    setTimeout(() => {
      boardDetailsObj.map((boardObj, index) => {
        const boardId = boardObj.boardId;
        let boardName = boardObj.boardName;
        if (!boardId && !boardName) return console.log("board id not found");

        setSectionName(boardName);

        setTimeout(() => {
          new Execution(email, boardId, boardName);
        }, index * timeInterval);
      });
    }, index * noOfCheckedCheckbox * timeInterval * 1.35);
  });

  function Execution(email, boardId, boardName) {
    if (!boardName) return console.log("boardname does not exist");

    userDetail = email;
    const message = {
      email,
      boardId,
      clientSignature,
    };

    (async () => {
      const addMembersUrl = `${websiteUrl}/add`;
      try {
        const response = await axios.post(addMembersUrl, message);
        const data = response.data;

        if (data.success) return (incrementSucessLength());
        if (data.error) {
          console.log(data.error);
          failuresArray += 1;
          if (data.error.cause.code == "ECONNRESET") {
            console.log("internet broke error");
          }
        }
      } catch (error) {
        //handling error and failures
        console.log("eror", error);
        incrementFailureLength() 

        const errorObj = error.response;

        const errorMessage = errorObj.data;

        if (errorMessage.insufficientCredits) {
          console.log("Error", "insufficientCredits");
        }
        if(errorMessage.error.message=='Request failed with status code 429') return console.log("Invite limit rached, wait 60 mins");
        console.log(errorMessage);
      } finally {
       incrementTotalAttemptLength()

        let showSuccessParams = {
          userDetail,
          boardName,
          isAddedTo,
          noOfCheckedCheckbox,
          userDetailsLength,
          succes,
          action,
          failuresArray,
          totalAttemptedArray,
          totalDurationLength,
          roundIndex,
        };


      }
    })();
  }

  return <ProgressBar pageName="add-member" />;
}




