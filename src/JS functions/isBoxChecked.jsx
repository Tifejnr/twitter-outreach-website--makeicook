import FetchIDCollections from "./FetchIdCollection";
import ShowSuccessMess from "./progressBar/SucessMessage";
import { validateInput } from "./Utilis/Validations/Input";
import { isAnyCheckboxChecked } from "./Utilis/Validations/Checkbox";

let succes;

export default async function IsBoxChecked() {
  const inputedMail = document.getElementById("resultoo").value

  if (!validateInput(inputedMail)) return console.log("Problem");

  if (!isAnyCheckboxChecked()) return console.log("Checkboxes not checked");

  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  let  idCollections = await FetchIDCollections()

  idCollections= idCollections[0]

  succes = [];

  Array.from(allCheckboxes).map((checkbox, index) => {
    const checkboxEl = document.getElementById(`check${index}`);

    if (!checkboxEl.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const nameOfBoard = boardEl.innerHTML;

    console.log(nameOfBoard);

    return new Execution(arrayNoFromId, inputedMail, idCollections);
  });
}


function Execution(arrayNo, inputedMail, idCollections) {
  const noOfCheckedCheckbox = document.querySelectorAll("input:checked").length;
  const email = inputedMail;

  const message = {
    email,
    boardId: idCollections[arrayNo],
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
