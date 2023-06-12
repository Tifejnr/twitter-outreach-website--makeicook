import { display, hideForms, hide } from "../Utilis/EleDisplay";

export default function ProgressBarExecution(noOfChecked, sumOfSucesses, action, sumOfFailures, totalAttemptedArray) {
if (sumOfFailures==undefined) {
  sumOfFailures=0
 }
const progressBarTitle = document.getElementById("progressBarTitle");
const successStatusTitle = document.getElementById("successStatusTitle");
const failureTitle = document.getElementById("failureTitle");
const mainContentCont = document.getElementById("mainContentCont");
const BAR = document.getElementById("bar");
const progressBarContainer = document.getElementById("loading");
const allForms = document.getElementsByTagName("form");
progressBarTitle.innerHTML=""

if (action =="deleting") {
  progressBarTitle.innerHTML = `Deleting Member from ${noOfChecked} Boards... `;
  successStatusTitle.innerHTML = `Successful Deletions: ${sumOfSucesses}`;
  failureTitle.innerHTML = `Failed Deletions: ${sumOfFailures}`;
}

if (action=="adding") {
  progressBarTitle.innerHTML = `Adding Member to ${noOfChecked} Boards... `;
  successStatusTitle.innerHTML = `Successful Additions: ${sumOfSucesses}`;
    failureTitle.innerHTML = `Failed Additions: ${sumOfFailures}`;

}
  hide(mainContentCont);
  hideForms(allForms);
  display(progressBarContainer);
  display(btnSection);

  let percentLoaded = (Number(totalAttemptedArray) / Number(noOfChecked)) * 100;

  BAR.style.width = percentLoaded + "%";
}

