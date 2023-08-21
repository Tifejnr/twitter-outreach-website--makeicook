export default function isAnyMemberCheckboxChecked(checkboxes) {
  const isCheckedArray = Array.from(checkboxes).map(
    (checkbox) => checkbox.checked
  );

  return isCheckedArray.includes(true);
}
