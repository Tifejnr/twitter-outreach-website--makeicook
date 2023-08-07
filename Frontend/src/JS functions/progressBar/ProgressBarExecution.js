import { display, hideForms, hide } from "../Utilis/EleDisplay";

export default function ProgressBarExecution(progressBarParams) {
  //Getting ele to manipulate
  const progressBarTitle = document.getElementById("progressBarTitle");
  const successStatusTitle = document.getElementById("successStatusTitle");
  const failureTitle = document.getElementById("failureTitle");
  const mainContentCont = document.getElementById("mainContentCont");
  const noOfRoundsEl = document.getElementById("noOfRounds");
  const totalRoundsEl = document.getElementById("totalRoundsEl");
  const BAR = document.getElementById("bar");
  const progressBarContainer = document.getElementById("loading");
  const allForms = document.getElementsByTagName("form");
  progressBarTitle.innerHTML = "";

  //getting params values
  const userDetail = progressBarParams.userDetail;
  const boardName = progressBarParams.boardName;
  const isAddedTo = progressBarParams.isAddedTo;
  const noOfCheckedCheckbox = progressBarParams.noOfCheckedCheckbox;
  const successLength = progressBarParams.succes;
  const action = progressBarParams.action;
  // const failuresArrayLength = progressBarParams.failuresArray;
  const totalAttemptedArrayLength = progressBarParams.totalAttemptedArray;
  const totalDurationLength = progressBarParams.totalDurationLength;
  const roundIndex = progressBarParams.roundIndex;
  const totalRounds = progressBarParams.userDetailsLength;

  if (failuresArrayLength == undefined) {
    failuresArrayLength = 0;
  }

  //Hide main ele
  hide(mainContentCont);
  hideForms(allForms);
  display(progressBarContainer);
  display(btnSection);

  if (!boardName)
    return console.log("no board name or roundindex for progress");

  if (action == "deleting") {
    progressBarTitle.innerHTML = `Deleting ${userDetail} from ${boardName}  `;
    successStatusTitle.innerHTML = `Successful ${isAddedTo} Deletions: ${successLength}`;
    failureTitle.innerHTML = `Failed Deletions: ${failuresArrayLength}`;
  }

  if (action == "adding") {
    progressBarTitle.innerHTML = `Adding ${userDetail} to ${boardName} `;
    successStatusTitle.innerHTML = `Successful ${isAddedTo} Additions: ${successLength}`;
    failureTitle.innerHTML = `Failed Additions: ${failuresArrayLength}`;
    noOfRoundsEl.innerHTML = `Current Round : ${roundIndex}`;

    if (totalRounds > 1) {
      totalRoundsEl.innerHTML = `Rounds to complete:  ${totalRounds}`;
    } else {
      totalRoundsEl.innerHTML = `Round to complete:  ${totalRounds}`;
    }
  }

  let percentLoaded =
    (Number(totalAttemptedArrayLength) / Number(totalDurationLength)) * 100;

  BAR.style.width = `${percentLoaded}%`;

  if (percentLoaded === 100) return succesMess(action, totalRounds);

  function succesMess(action, totalRounds) {
    setTimeout(() => {
      const progressBarTitle = document.getElementById("progressBarTitle");
      const okayEl = document.getElementById("okay");
      const cancelEl = document.getElementById("cancelBtn");
      const completedStatus = document.getElementById("completedStatus");
      if (action == "deleting") {
        if (totalRounds > 1)
          completedStatus.innerHTML = `Members Deletion Completed `;
        else completedStatus.innerHTML = `Member Deletion Completed `;
      }

      if (action == "adding") {
        if (totalRounds > 1)
          completedStatus.innerHTML = `Members Addition Completed `;
        else completedStatus.innerHTML = `Member Addition Completed `;

        if (totalRounds > 1) {
          totalRoundsEl.innerHTML = `Completed Rounds:  ${totalRounds}`;
        } else {
          totalRoundsEl.innerHTML = `Completed Round:  ${totalRounds}`;
        }
      }
      return (
        display(okayEl),
        hide(progressBarTitle),
        hide(cancelEl),
        hide(noOfRoundsEl)
      );
    }, 600);
  }
}
