export default function CheckAll(checkboxesArray) {
  checkboxesArray.forEach((checkbox) => {
    checkbox.checked = true;
  });
}
