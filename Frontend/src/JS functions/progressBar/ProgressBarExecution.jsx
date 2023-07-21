// import { display, hideForms, hide } from "../Utilis/EleDisplay";

// export default function ProgressBarExecution(progressBarParams) {

//   const userDetail= progressBarParams.userDetail
//   const isAddedTo = progressBarParams.isAddedTo 
//   const noOfCheckedCheckbox= progressBarParams.noOfCheckedCheckbox
//   const successLength= progressBarParams.successLength + 1
//   const action= progressBarParams.action
//   let failuresArrayLength= progressBarParams.failuresArrayLength
//   const totalAttemptedArrayLength= progressBarParams.totalAttemptedArrayLength

// if (failuresArrayLength==undefined) {
//   failuresArrayLength= 0
//  }

// const progressBarTitle = document.getElementById("progressBarTitle");
// const successStatusTitle = document.getElementById("successStatusTitle");
// const failureTitle = document.getElementById("failureTitle");
// const mainContentCont = document.getElementById("mainContentCont");
// const BAR = document.getElementById("bar");
// const progressBarContainer = document.getElementById("loading");
// const allForms = document.getElementsByTagName("form");
// progressBarTitle.innerHTML=""

// if (action =="deleting") {
//   progressBarTitle.innerHTML = `Deleting ${userDetail} from ${noOfCheckedCheckbox} Boards... `;
//   successStatusTitle.innerHTML = `Successful ${isAddedTo} Deletions: ${successLength}`;
//   failureTitle.innerHTML = `Failed Deletions: ${failuresArrayLength}`;
// }

// if (action=="adding") {
//   progressBarTitle.innerHTML = `Adding ${userDetail} to ${noOfCheckedCheckbox} Boards... `;
//   successStatusTitle.innerHTML = `Successful ${isAddedTo} Additions: ${successLength}`;
//   failureTitle.innerHTML = `Failed Additions: ${failuresArrayLength}`;

// }
//   hide(mainContentCont);
//   hideForms(allForms);
//   display(progressBarContainer);
//   display(btnSection);

//   let percentLoaded = (Number(totalAttemptedArrayLength) / Number(noOfCheckedCheckbox)) * 100;

//   BAR.style.width = percentLoaded + "%";
// }

