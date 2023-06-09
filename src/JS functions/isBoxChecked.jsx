import Execution from "./execution";

let succes;

import FetchIDCollections from "./FetchIdCollection";

export default async function IsBoxChecked() {
  const inputedMail = document.getElementById("resultoo").value

  if (!validateInput(inputedMail)) return console.log("Problem");

  if (!isAnyCheckboxChecked()) return console.log("Checkboxes not checked");

  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  const idCollections = await FetchIDCollections()

  console.log(allCheckboxes)
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



function validateInput(input) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === '';

  if (isEmpty) return console.log("email is empty")

  // Check if input is a valid email
  const isEmailValid = validateEmail(input);

  if (!isEmailValid) return console.log("invalid email")

  return true
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}



// function isAnyCheckboxChecked() {
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   const isCheckedArray = Array.from(checkboxes).map((checkbox) => checkbox.checked);

//   return isCheckedArray.includes(true);
// }
