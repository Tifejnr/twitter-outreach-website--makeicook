import { showCountsOfChecked } from "../EleDisplay";

export default function CheckAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    showCountsOfChecked(checkboxes);
  });

}



