
import ProgressBarExecution from "./ProgressBarExecution";
import { display, hide } from "../Utilis/EleDisplay";

export default function ShowSuccessMess(noOfCheckedCheckbox, noOfSucess, action,sumOfFailures, totalAttemptedArray) {
   ProgressBarExecution(noOfCheckedCheckbox, noOfSucess, action, sumOfFailures, totalAttemptedArray);

  if (noOfCheckedCheckbox == totalAttemptedArray) return succesMess(action);
}



function succesMess(action) {

setTimeout(() => {
    
const progressBarTitle = document.getElementById("progressBarTitle");
const okayEl = document.getElementById("okay");
const cancelEl = document.getElementById("cancelBtn");
  const completedStatus = document.getElementById("completedStatus");
  if (action=="deleting") {
  completedStatus.innerHTML = `Member Deletion Completed `;
  }

  if (action=="adding") {
  completedStatus.innerHTML = `Member Addition Completed `;
  }
  display(okayEl);
  hide(progressBarTitle);
  hide(cancelEl);

      }, 700);
}
