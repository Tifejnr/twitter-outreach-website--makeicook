import FetchData from "./fetchData";
import ShowSuccessMess from "./progressBar/SucessMessage";
import { validateInput } from "./Utilis/Validations/Input";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";
import { findBoardIdByName } from "./Utilis/FindBoardId/byName";


let succes;

export default async function AddToBoard() {
  const email = document.getElementById("resultoo").value

  if (!validateInput(email)) return console.log("Problem");

  if (!isAnyCheckboxChecked()) return console.log("Checkboxes not checked");

  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  ShowSuccessMess(100, 0);

  const boardCollection = await FetchData(true)

  succes = [];

  Array.from(allCheckboxes).map((checkbox, index) => {
    const checkboxEl = document.getElementById(`check${index}`);

    if (!checkboxEl.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const boardName = boardEl.innerHTML;

    const foundBoard= findBoardIdByName(boardCollection, boardName) 

    if (!foundBoard) return console.log("board not found")
    const boardId = foundBoard.id

    return new Execution( email, boardId );
  });
}


function Execution(email, boardId) {
  const noOfCheckedCheckbox = document.querySelectorAll("input:checked").length;

  const message = {
    email,
   boardId
  };

  async function addMember() {
    const response = await fetch(`http://localhost:3000/add`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(message),
    });

    const data = await response.json();
    if (!data.success) return;

    succes.push(1);
    const noOfSucess = succes.reduce((a, b) => a + b, 0);
   ShowSuccessMess(noOfCheckedCheckbox, noOfSucess);
  }
  addMember().catch((error) => {
    console.log(error);
  });
}
