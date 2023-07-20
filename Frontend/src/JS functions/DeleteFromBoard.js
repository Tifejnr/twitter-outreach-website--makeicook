import ShowSuccessMess from "./progressBar/SucessMessage";
import { validateUsername } from "./Utilis/Validations/Username";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";
import { findBoardIdByName } from "./Utilis/FindBoardId/byName";
import { websiteUrl } from "./websiteUrl";

let succes, failuresArray, totalAttemptedArray;

export default async function DeleteMemberFromBoard() {
  const action = "deleting";
  let username = document.getElementById("resultoo").value;

  if (!validateUsername(username)) return console.log("Problem");

  if (!isAnyCheckboxChecked()) return console.log("Checkboxes not checked");

  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  ShowSuccessMess(100, 0, action);

  const boardCollection = await FetchData(true);

  succes = [];
  failuresArray = [];
  totalAttemptedArray = [];

  username = validateUsername(username);

  Array.from(allCheckboxes).map((checkbox, index) => {
    const checkboxEl = document.getElementById(`check${index}`);

    if (!checkboxEl.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const boardName = boardEl.innerHTML;

    const foundBoard = findBoardIdByName(boardCollection, boardName);

    if (!foundBoard) return console.log("board not found");

    const boardId = foundBoard.id;

    return new Execution(username, boardId, action);
  });
}

function Execution(username, boardId) {
  const noOfCheckedCheckbox = document.querySelectorAll("input:checked").length;

  const message = {
    username,
    boardId,
  };

  async function deleteMember() {
    const action = "deleting";
    const response = await fetch(`${websiteUrl}/delete`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(message),
    });

    const data = await response.json();

    totalAttemptedArray.push(1);

    if (data.userNameNotFound) {
      failuresArray.push(1);
      return ShowSuccessMess(
        noOfCheckedCheckbox,
        succes.length,
        action,
        failuresArray.length,
        totalAttemptedArray.length
      );
    }

    succes.push(1);
    ShowSuccessMess(
      noOfCheckedCheckbox,
      succes.length,
      action,
      failuresArray.length,
      totalAttemptedArray.length
    );
  }
  deleteMember().catch((error) => {
    console.log(error);
  });
}
