export default function CheckAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes)
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    showChecked(checkboxes);
  });

}

 function showChecked(checkboxes) {
  const noOfCheckedDisplayCont = document.getElementById("para");
  const noOfChecked = document.querySelectorAll("input:checked").length;
  noOfCheckedDisplayCont.innerHTML = `${noOfChecked} of ${checkboxes.length}`;
}


