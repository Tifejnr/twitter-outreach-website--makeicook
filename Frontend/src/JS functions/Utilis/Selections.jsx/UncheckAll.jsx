import { showCountsOfChecked } from "../EleDisplay";

export default function UncheckAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
     showCountsOfChecked(checkboxes)
  });
 
}




