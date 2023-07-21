
import { display, hide } from "../Utilis/EleDisplay";

export default function ShowSuccessMess(showSuccessParams) {
  const noOfCheckedCheckbox= showSuccessParams.noOfCheckedCheckbox
  const action= showSuccessParams.action
  const  totalAttemptedArrayLength= showSuccessParams.totalAttemptedArrayLength

  //  ProgressBarExecution(showSuccessParams);

  // if (noOfCheckedCheckbox == totalAttemptedArrayLength) return succesMess(action);
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

      }, 600);
}
