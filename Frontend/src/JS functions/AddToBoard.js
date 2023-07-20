import ShowSuccessMess from "./progressBar/SucessMessage";
import { validateInput } from "./Utilis/Validations/Input";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";
import { findBoardIdByName } from "./Utilis/FindBoardId/byName";
import { websiteUrl } from "./websiteUrl";

let succes, failuresArray, totalAttemptedArray;

export default async function AddToBoard() {
  const email = document.getElementById("resultoo").value;
  const action = "adding";

  if (!validateInput(email)) return console.log("Problem");

  if (!isAnyCheckboxChecked()) return console.log("Checkboxes not checked");

  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  ShowSuccessMess(100, 0, action);

  const boardCollection = await FetchData(true);

  succes = [];
  failuresArray = [];
  totalAttemptedArray = [];

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

    return new Execution(email, boardId);
  });
}

function Execution(email, boardId) {
  const noOfCheckedCheckbox = document.querySelectorAll("input:checked").length;

  const message = {
    email,
    boardId,
  };

  async function addMember() {
    const action = "adding";
    const response = await fetch(`${websiteUrl}/add`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(message),
    });

    totalAttemptedArray.push(1);

    const data = await response.json();
    if (data.error) {
      console.log(data.error);
      if (data.error.cause.code == "ECONNRESET") {
        console.log("internet broke error");
      }

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
  addMember().catch((error) => {
    console.log(error);
  });
}
