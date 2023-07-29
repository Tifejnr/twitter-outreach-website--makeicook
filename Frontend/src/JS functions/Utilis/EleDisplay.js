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

function showCountsOfChecked(checkboxesArray) {
  const noOfCheckedDisplayCont = document.getElementById("para");
  const totalCheckboxes = checkboxesArray.length;
  const noOfChecked = checkboxesArray.filter(
    (checkbox) => checkbox.checked
  ).length;
  noOfCheckedDisplayCont.innerHTML = `${noOfChecked} of ${totalCheckboxes}`;
}

export { display, hide, hideForms, displayForms, showCountsOfChecked };
