
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



export { display, hide ,hideForms, displayForms, };