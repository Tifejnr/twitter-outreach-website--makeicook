import { display, hideForms, hide } from "../Utilis/EleDisplay";

export default function ProgressBarExecution(progressBarParams) {
  const userDetail = progressBarParams.userDetail;
  const boardName = progressBarParams.boardName;
  const isAddedTo = progressBarParams.isAddedTo;
  const noOfCheckedCheckbox = progressBarParams.noOfCheckedCheckbox;
  const successLength = progressBarParams.succes;
  const action = progressBarParams.action;
  const failuresArrayLength = progressBarParams.failuresArray;
  const totalAttemptedArrayLength = progressBarParams.totalAttemptedArray;
  const totalDurationLength = progressBarParams.totalDurationLength;

  if (failuresArrayLength == undefined) {
    failuresArrayLength = 0;
  }

  const progressBarTitle = document.getElementById("progressBarTitle");
  const successStatusTitle = document.getElementById("successStatusTitle");
  const failureTitle = document.getElementById("failureTitle");
  const mainContentCont = document.getElementById("mainContentCont");
  const BAR = document.getElementById("bar");
  const progressBarContainer = document.getElementById("loading");
  const allForms = document.getElementsByTagName("form");
  progressBarTitle.innerHTML = "";

  //Hide main ele
  hide(mainContentCont);
  hideForms(allForms);
  display(progressBarContainer);
  display(btnSection);

  if (action == "deleting") {
    progressBarTitle.innerHTML = `Deleting ${userDetail} from ${noOfCheckedCheckbox} Boards... `;
    successStatusTitle.innerHTML = `Successful ${isAddedTo} Deletions: ${successLength}`;
    failureTitle.innerHTML = `Failed Deletions: ${failuresArrayLength}`;
  }

  if (action == "adding") {
    progressBarTitle.innerHTML = `Adding ${userDetail} to ${noOfCheckedCheckbox}  Boards... `;
    successStatusTitle.innerHTML = `Successful ${isAddedTo} Additions: ${successLength}`;
    failureTitle.innerHTML = `Failed Additions: ${failuresArrayLength}`;
  }

  let percentLoaded =
    (Number(totalAttemptedArrayLength) / Number(totalDurationLength)) * 100;

  BAR.style.width = `${percentLoaded}%`;

  if (percentLoaded === 100) return succesMess(action);
}

function succesMess(action) {
  setTimeout(() => {
    const progressBarTitle = document.getElementById("progressBarTitle");
    const okayEl = document.getElementById("okay");
    const cancelEl = document.getElementById("cancelBtn");
    const completedStatus = document.getElementById("completedStatus");
    if (action == "deleting") {
      completedStatus.innerHTML = `Member Deletion Completed `;
    }

    if (action == "adding") {
      completedStatus.innerHTML = `Member Addition Completed `;
    }
    return display(okayEl), hide(progressBarTitle), hide(cancelEl);
  }, 600);
}
