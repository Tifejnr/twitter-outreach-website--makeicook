function display(ele) {
  ele.style.display = "block";
}
function hide(ele) {
  ele.style.display = "none";
}

function hideForms(forms) {
  for (var i = 0; i < forms.length; i++) {
    forms[i].style.display = "none";
  }
}

function displayForms(forms) {
  for (var i = 0; i < forms.length; i++) {
    forms[i].style.display = "block";
  }
}

function showCountsOfChecked() {
  const noOfCheckedDisplayCont = document.getElementById("para");
  const totalCheckboxes = document.querySelectorAll(".board-checkbox").length;
  const noOfChecked = document.querySelectorAll(
    ".board-checkbox:checked"
  ).length;
  noOfCheckedDisplayCont.innerHTML = `${noOfChecked} of ${totalCheckboxes}`;
}

export { display, hide, hideForms, displayForms, showCountsOfChecked };
