import ProgressBarExecution from "./progressBar/ProgressBarExecution";
import { validateInput } from "./Utilis/Validations/Input";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";
import { findBoardIdByName } from "./Utilis/FindBoardId/byName";
import { websiteUrl } from "./websiteUrl";

let succes,
  failuresArray,
  totalAttemptedArray,
  totalDurationLength,
  userDetail,
  noOfCheckedCheckbox,
  boardName,
  userDetailsLength;

let showSuccessParams = {};
const action = "adding";
const isAddedTo = "boards";

export default async function AddToBoards(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const emailInputs = executionParams.textAreaValue;
  const textAreaRef = executionParams.textAreaRefEl;

  if (!validateInput(emailInputs, textAreaRef)) return false;

  if (!isAnyCheckboxChecked()) return false;

  const allCheckboxesOnPage = document.querySelectorAll(".board-checkbox");

  noOfCheckedCheckbox = document.querySelectorAll(
    ".board-checkbox:checked"
  ).length;

  const emailListSplited = emailInputs.split(",");

  userDetailsLength = Number(emailListSplited.length);
  totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;

  const boardDetailsObj = Array.from(allCheckboxesOnPage).map(
    (checkbox, index) => {
      const checkboxEl = document.getElementById(`check${index}`);
      if (!checkboxEl.checked) return false;

      const checkboxId = checkbox.id;

      const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

      const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

      boardName = boardEl.innerHTML;

      const foundBoard = findBoardIdByName(boardsCollection, boardName);

      if (!foundBoard) return console.log("board not found");
      const boardId = foundBoard.id;

      const neededObj = {
        boardId,
        boardName,
      };

      return neededObj;
    }
  );

  if (!boardDetailsObj) return "";

  totalAttemptedArray = 0;
  // each email execution to server
  emailListSplited.map((eachEmail, index) => {
    const email = eachEmail.trim();
    //loop through all checked boards
    setTimeout(() => {
      boardDetailsObj.map((boardObj, index) => {
        succes = 0;
        failuresArray = 0;
        const boardId = boardObj.boardId;
        boardName = boardObj.boardName;

        if (!boardId && !boardName) return console.log("board id not found");

        setTimeout(() => {
          new Execution(email, boardId, boardName);
        }, index * 1000);
      });
    }, index * 1300 * noOfCheckedCheckbox);
  });

  function Execution(email, boardId, boardName) {
    userDetail = email;
    const message = {
      email,
      boardId,
    };

    (async () => {
      try {
        const response = await fetch(`${websiteUrl}/add`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(message),
        });

        const data = await response.json();
        if (data.error) {
          console.log(data);
          if (data.error.cause.code == "ECONNRESET") {
            console.log("internet broke error");
          }

          failuresArray += 1;
        }

        console.log(data);

        succes += 1;
      } catch (error) {
        console.log(error);
      } finally {
        totalAttemptedArray += 1;

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
        };

        ProgressBarExecution(showSuccessParams);

        console.log(
          totalDurationLength,
          totalAttemptedArray,
          succes,
          failuresArray
        );
      }
    })();
  }
}
