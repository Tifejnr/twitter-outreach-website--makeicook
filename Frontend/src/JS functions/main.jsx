let emailValue1 = [];
let emailElaa = document.getElementById("resultoo");
let emailEl = document.getElementById("result");
let addmailEl = document.getElementById("addmail-error");
let addmailEl2 = document.getElementById("addmail-error2");
let serviceErrorEl = document.getElementById("service-error");
let serviceErrorEl2 = document.getElementById("service-error2");
let submitEl = document.getElementById("submit-el");
let successEl = document.getElementById("success");
let emailEmptyErr = document.getElementById("email-error");
let emailEmptyErr2 = document.getElementById("email-error2");
let sendingProgressEl = document.getElementById("sendin-progress");
let sendingProgressEl2 = document.getElementById("sendin-progress2");
let refreshEl = document.getElementById("btn-reload");
let fetchingBoardsEl = document.getElementById("fetch-progress2");
let counterEl = document.getElementById("para");
let containerEl = document.getElementById("container");
let okayEl = document.getElementById("okay");
const cancelEl = document.getElementById("cancelBtn");
const btnSection = document.getElementById("btnSection");

let dataLength;
let lenghtID;
let idCollections = [];
let slider = document.getElementById("progressBar");
let progress = document.getElementById("progress");
let button = document.getElementById("myButton");
let hideFieldEl = document.getElementById("field-hide");
let mainHideEl = document.getElementById("hidecontents");
let fetchedData;
let realLenght;

function selectall() {
  var checkboxes = document.getElementsByName("fruit");
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    if (checkboxes[i].style.display != "none") {
      checkboxes[i].checked = true;
    }
  }
  showChecked();
}

document.getElementById("select-all").addEventListener("click", (e) => {
  e.preventDefault();
  selectall();
});

document.getElementById("clear-select").addEventListener("click", () => {
  var checkboxes = document.getElementsByName("fruit");
  for (var checkbox of checkboxes) {
    checkbox.checked = false;

    document.querySelectorAll("input:checked").length = 0;
    showChecked();
  }
});

function showChecked() {
  const noOfCheckedDisplayCont = document.getElementById("para");
  const noOfChecked = document.querySelectorAll("input:checked").length;
  noOfCheckedDisplayCont.innerHTML = `${noOfChecked} of ${dataLength}`;
}
document.querySelectorAll("input[name=fruit]").forEach((i) => {
  i.onclick = function () {
    showChecked();
  };
});

// okayEl.addEventListener("click", () => {
//   window.location.href = "trelloadd.html";
// });

// cancelEl.addEventListener("click", () => {
//   window.location.href = "trelloadd.html";
// });

function showErrors() {
  if (emailEmptyErr2.style.display === "none") {
    emailEmptyErr2.style.display = "block";
  } else {
    emailEmptyErr2.style.display = "block";
  }
}
function hideErrors() {
  if (emailEmptyErr2.style.display === "block") {
    emailEmptyErr2.style.display = "none";
  } else {
    emailEmptyErr2.style.display = "none";
  }
}

//visibilities hiding//
function mainhide() {
  if (mainHideEl.style.display === "block") {
    mainHideEl.style.display = "none";
  } else {
    mainHideEl.style.display = "none";
  }
}

function mainShow() {
  if (mainHideEl.style.display === "none") {
    mainHideEl.style.display = "block";
  } else {
    mainHideEl.style.display = "block";
  }
}

function RefreshButtonShow() {
  if (refreshEl.style.display === "none") {
    refreshEl.style.display = "block";
  } else {
    refreshEl.style.display = "block";
  }
}

function DeleteButtonShow() {
  if (deletingEl.style.display === "none") {
    deletingEl.style.display = "block";
  } else {
    deletingEl.style.display = "block";
  }
}

function HideDeleteButton() {
  if (deletingEl.style.display === "block") {
    deletingEl.style.display = "none";
  } else {
    deletingEl.style.display = "none";
  }
}

function HideRefreshButton() {
  if (refreshEl.style.display === "block") {
    refreshEl.style.display = "none";
  } else {
    refreshEl.style.display = "none";
  }
}

function HideAddEmailMessage() {
  if (successEl.style.display === "block") {
    successEl.style.display = "none";
  } else {
    successEl.style.display = "none";
  }
}

function inviscibleWrongMessage() {
  if (fetchingBoardsEl.style.display === "block") {
    fetchingBoardsEl.style.display = "none";
  } else {
    fetchingBoardsEl.style.display = "none";
  }
}

function inviscibleAdmail() {
  if (emailEmptyErr.style.display === "block") {
    emailEmptyErr.style.display = "none";
  } else {
    emailEmptyErr.style.display = "none";
  }
}

function hideContentswhenLoading() {
  if (hideContent.style.display === "block") {
    hideContent.style.display = "none";
  } else {
    hideContent.style.display = "none";
  }
}

function showContentswhenLoading() {
  if (hideContent.style.display === "none") {
    hideContent.style.display = "block";
  } else {
    hideContent.style.display = "block";
  }
}

let hideContent = document.querySelector("#hidecontents");

let deletingEl = document.getElementById("deleting-btn");
let backEl = document.querySelector(".back-btn");

backEl.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/login";
});

deletingEl.addEventListener("click", () => {
  emailValue1.push(emailElaa.value);

  for (let i = 0; i < emailValue1.length; i++) {
    emailValue = emailValue1[i];
  }
  if (document.querySelectorAll("input:checked").length == 0) {
    setTimeout(() => {
      hideErrors();
    }, 5000);
    showErrors();

    emailEmptyErr2.innerHTML = `You Must Select a Board`;
  } else if (emailValue == [] || emailValue == "") {
    setTimeout(() => {
      hideErrors();
    }, 5000);
    showErrors();

    emailEmptyErr2.innerHTML = `Enter a valid Trello-name`;
    serviceErrorEl.innerHTML = "";
    serviceErrorEl2.innerHTML = "";
    successEl.innerHTML = "";
    fetchingBoardsEl.innerHTML = "";
    sendingProgressEl2.innerHTML = "";
    sendingProgressEl.innerHTML = "";
  } else {
    emailElaa.value = "";
    isBoxChecked();
  }
});

startFetch();
function startFetch() {
  async function adds() {
    const url = "http://localhost:3000/start";
    const dataSent = { send: true };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSent),
    });

    const dataRaw = await response.json();

    if (dataRaw.error) {
      if (dataRaw.error.code === "ENOTFOUND")
        return console.log("No internet network");
    }

    const data = dataRaw.boards;

    dataLength = data.length;
    lenghtID = data.length - 1;
    fetchedData = [];

    data.map((board, index) => {
      // Create the form element
      const form = document.createElement("form");
      form.className = "item";
      form.name = "main";
      hide(form);

      // Create the checkbox element
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "fruit";
      checkbox.className = "inputs";
      checkbox.id = `check${index}`;

      // Create the label element
      const label = document.createElement("label");
      label.htmlFor = `check${index}`;
      label.id = `labelcheck${index}`;
      label.innerHTML = board.name;

      // Append the checkbox and label elements to the form
      form.appendChild(checkbox);
      form.appendChild(label);

      // Append the form to the document body or any desired container
      document.body.appendChild(form);

      const boardId = board.id;
      idCollections.push(boardId);

      fetchedData.push(1);
      const fetchedDataSum = fetchedData.reduce((a, b) => a + b, 0);
      progressBarMove(fetchedDataSum, lenghtID);
    });
  }

  adds().catch((error) => {
    console.log(error);
  });
}

function showMemeberNotFound() {
  setTimeout(() => {
    fetchingBoardsEl.innerHTML = `Member Not Found in Boards! `;
    emailEmptyErr.innerHTML = "";
    emailEmptyErr2.innerHTML = "";
    serviceErrorEl.innerHTML = "";
    serviceErrorEl2.innerHTML = "";
    sendingProgressEl2.innerHTML = "";
    sendingProgressEl.innerHTML = "";
    addmailEl.innerHTML = "";
    addmailEl2.innerHTML = "";
    cancelnoBar();
    okayBar();
  }, 7000);
}

function errorMessage() {
  if (errorMes2 == null || errorMes == null) {
    fetchingBoardsEl.innerHTML = "";
    addmailEl.innerHTML = "";
    addmailEl2.innerHTML = "";
    emailEmptyErr.innerHTML = "";
    emailEmptyErr2.innerHTML = "";
    serviceErrorEl.innerHTML = "";
    serviceErrorEl2.innerHTML = "";
    sendingProgressEl2.innerHTML = "";
    sendingProgressEl.innerHTML = "";
  } else {
    showProgressBar();
    showContentswhenLoading();

    emailEmptyErr.innerHTML = "";
    emailEmptyErr2.innerHTML = "";
    serviceErrorEl.innerHTML = "";
    serviceErrorEl2.innerHTML = "";
    sendingProgressEl2.innerHTML = "";
    sendingProgressEl.innerHTML = "";
    fetchingBoardsEl.innerHTML = "";

    reloading();
  }
}

function reloading() {
  window.location.reload();
  return false;
}

function showSuccessMess(noOfCheckedCheckbox, noOfSucess) {
  displayBoardFetched(noOfCheckedCheckbox, noOfSucess);

  if (noOfCheckedCheckbox == noOfSucess) return succesMess();
}

function displayBoardFetched(noOfCheckedCheckbox, noOfSucess) {
  progressBarExecution(noOfCheckedCheckbox, noOfSucess);
  emailEmptyErr.innerHTML = "";
  emailEmptyErr2.innerHTML = "";
  serviceErrorEl.innerHTML = "";
  serviceErrorEl2.innerHTML = "";
  sendingProgressEl2.innerHTML = "";
  sendingProgressEl.innerHTML = "";
  addmailEl.innerHTML = "";
  addmailEl2.innerHTML = "";
  successEl.innerHTML = ``;
  HideDeleteButton();
}

// display(cancelEl);

function succesMess() {
  const completedStatus = document.getElementById("completedStatus");
  completedStatus.innerHTML = `Member Addition Completed `;
  display(okayEl);
  hide(progressBarTitle);
  hide(cancelEl);
}

function display(ele) {
  ele.style.display = "block";
}
function hide(ele) {
  ele.style.display = "none";
}
