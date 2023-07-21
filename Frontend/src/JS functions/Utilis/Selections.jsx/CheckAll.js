import { showCountsOfChecked } from "../EleDisplay";

export default function CheckAll() {
  const checkboxes = document.querySelectorAll(".board-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    showCountsOfChecked();
  });
}
