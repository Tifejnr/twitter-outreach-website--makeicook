
import ProgressBarExecution from "./ProgressBarExecution";

export default function ShowSuccessMess(noOfCheckedCheckbox, noOfSucess) {
  displayBoardFetched(noOfCheckedCheckbox, noOfSucess);

  if (noOfCheckedCheckbox == noOfSucess) return succesMess();
}

function displayBoardFetched(noOfCheckedCheckbox, noOfSucess) {
  ProgressBarExecution(noOfCheckedCheckbox, noOfSucess);
}

// display(cancelEl);

function succesMess() {
const progressBarTitle = document.getElementById("progressBarTitle");
const okayEl = document.getElementById("okay");
const cancelEl = document.getElementById("cancelBtn");
  const completedStatus = document.getElementById("completedStatus");
  completedStatus.innerHTML = `Member Addition Completed `;
  display(okayEl);
  hide(progressBarTitle);
  hide(cancelEl);
}

function display(ele) {
  ele.style.display = "block";
}
function hide(ele) {
  ele.style.display = "none";
}
