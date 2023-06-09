
export default function UncheckAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
     showChecked(checkboxes)
  });
 
}



function showChecked(checkboxes) {
  const noOfCheckedDisplayCont = document.getElementById("para");
  const noOfChecked = document.querySelectorAll("input:checked").length;
  noOfCheckedDisplayCont.innerHTML = `${noOfChecked} of ${checkboxes.length}`;
}


