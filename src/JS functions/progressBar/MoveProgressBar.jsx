export default function progressBarMove(fetchedDataSum, lengthId) {
const progressBarTitle = document.getElementById("progressBarTitle");
const successStatusTitle = document.getElementById("successStatusTitle");
const mainContentCont = document.getElementById("mainContentCont");
const BAR = document.getElementById("bar");
const progressBarContainer = document.getElementById("loading");
const allForms = document.getElementsByTagName("form");
const startingTitle = "Loading Your Boards...";
progressBarTitle.innerHTML = startingTitle;

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