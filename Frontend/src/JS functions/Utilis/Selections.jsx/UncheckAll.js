import { showCountsOfChecked } from "../EleDisplay";

export default function UncheckAll() {
  const checkboxes = document.querySelectorAll('.board-checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
     showCountsOfChecked(checkboxes)
  });
 
}




