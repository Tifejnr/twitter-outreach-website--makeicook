function progressBarExecution(noOfChecked, sumOfSucesses) {
  progressBarTitle.innerHTML = `Adding Member to ${noOfChecked} Boards... `;
  successStatusTitle.innerHTML = `Boards with Successful Additions : ${sumOfSucesses}`;
  hide(mainContentCont);
  hideForms(allForms);
  display(progressBarContainer);
  display(btnSection);

  let percentLoaded = (Number(sumOfSucesses) / Number(noOfChecked)) * 100;

  console.log(percentLoaded);
  BAR.style.width = percentLoaded + "%";

  if (percentLoaded == 100) {
    return setTimeout(() => {
      //   display(mainContentCont);
      //   hide(progressBarContainer);
      //   displayForms(allForms);
      succesMess();
    }, 600);
  }
}
