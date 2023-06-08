export default function progressBarMove(fetchedDataSum, lengthId) {

  console.log(BAR)
  let percentLoaded = (Number(fetchedDataSum) / Number(lengthId + 1)) * 100;
  BAR.style.width = percentLoaded + "%";

  if (percentLoaded == 100) {
    return setTimeout(() => {
      display(mainContentCont);
      hide(progressBarContainer);
      displayForms(allForms);
    }, 600);
  }
}

function display(ele) {
  ele.style.display = "block";
}
function hide(ele) {
  ele.style.display = "none";
}

function displayForms(forms) {
  for (var i = 0; i < forms.length; i++) {
    forms[i].style.display = "block";
  }
}
function hideForms(forms) {
  for (var i = 0; i < forms.length; i++) {
    forms[i].style.display = "none";
  }
}