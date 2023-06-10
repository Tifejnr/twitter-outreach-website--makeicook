import { display, hideForms, hide } from "../Utilis/EleDisplay";

export default function ProgressBarExecution(noOfChecked, sumOfSucesses) {
const progressBarTitle = document.getElementById("progressBarTitle");
const successStatusTitle = document.getElementById("successStatusTitle");
const mainContentCont = document.getElementById("mainContentCont");
const BAR = document.getElementById("bar");
const progressBarContainer = document.getElementById("loading");
const allForms = document.getElementsByTagName("form");
progressBarTitle.innerHTML =""


  progressBarTitle.innerHTML = `Adding Member to ${noOfChecked} Boards... `;
  successStatusTitle.innerHTML = `Successful Additions : ${sumOfSucesses}`;
  hide(mainContentCont);
  hideForms(allForms);
  display(progressBarContainer);
  display(btnSection);

  let percentLoaded = (Number(sumOfSucesses) / Number(noOfChecked)) * 100;

  console.log(percentLoaded);
  BAR.style.width = percentLoaded + "%";
}

