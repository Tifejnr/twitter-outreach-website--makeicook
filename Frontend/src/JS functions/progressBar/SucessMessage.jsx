
import ProgressBarExecution from "./ProgressBarExecution";
import { display, hide } from "../Utilis/EleDisplay";

export default function ShowSuccessMess(noOfCheckedCheckbox, noOfSucess, action) {
   ProgressBarExecution(noOfCheckedCheckbox, noOfSucess, action);

  if (noOfCheckedCheckbox == noOfSucess) return succesMess(action);
}



function succesMess() {
const progressBarTitle = document.getElementById("progressBarTitle");
const okayEl = document.getElementById("okay");
const cancelEl = document.getElementById("cancelBtn");
  const completedStatus = document.getElementById("completedStatus");
  if (action=="deletion") {
  completedStatus.innerHTML = `Member Deletion Completed `;
  }

  if (action=="addition") {
  completedStatus.innerHTML = `Member Addition Completed `;
  }
  display(okayEl);
  hide(progressBarTitle);
  hide(cancelEl);
}
