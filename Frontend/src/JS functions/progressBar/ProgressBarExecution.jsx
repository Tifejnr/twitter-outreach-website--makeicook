import { display, hideForms, hide } from "../Utilis/EleDisplay";

export default function ProgressBarExecution(noOfChecked, sumOfSucesses, action) {
const progressBarTitle = document.getElementById("progressBarTitle");
const successStatusTitle = document.getElementById("successStatusTitle");
const mainContentCont = document.getElementById("mainContentCont");
const BAR = document.getElementById("bar");
const progressBarContainer = document.getElementById("loading");
const allForms = document.getElementsByTagName("form");

if (action ==="deleting") {
  progressBarTitle.innerHTML = `Deleting Member from ${noOfChecked} Boards... `;
  successStatusTitle.innerHTML = `Successful Deletions : ${sumOfSucesses}`;
}

if (action=="adding") {
  progressBarTitle.innerHTML = `Adding Member to ${noOfChecked} Boards... `;
  successStatusTitle.innerHTML = `Successful Additions : ${sumOfSucesses}`;

}
  hide(mainContentCont);
  hideForms(allForms);
  display(progressBarContainer);
  display(btnSection);

  let percentLoaded = (Number(sumOfSucesses) / Number(noOfChecked)) * 100;

  console.log(percentLoaded);
  BAR.style.width = percentLoaded + "%";
}

