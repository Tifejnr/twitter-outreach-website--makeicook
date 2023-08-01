export default function UncheckAll(checkboxesArray) {
  checkboxesArray.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
