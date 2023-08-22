export default function isAnyMemberCheckboxChecked(checkboxesArray) {
  const isCheckedArray = Array.from(checkboxesArray).map(
    (checkbox) => checkbox.checked
  );

  return isCheckedArray.includes(true);
}
