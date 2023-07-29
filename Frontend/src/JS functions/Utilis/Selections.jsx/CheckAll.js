import { showCountsOfChecked } from "../EleDisplay";

export default function CheckAll(checkboxesArray) {
  checkboxesArray.forEach((checkbox) => {
    checkbox.checked = true;
    showCountsOfChecked(checkboxesArray);
  });
}
