import { showCountsOfChecked } from "../Utilis/EleDisplay";

export default function CheckAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes)
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    showCountsOfChecked(checkboxes);
  });

}



