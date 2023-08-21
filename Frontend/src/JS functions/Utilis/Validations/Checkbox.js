function isAnyCheckboxChecked(checkboxesArray) {
  const isCheckedArray = Array.from(checkboxesArray).map(
    (checkbox) => checkbox.checked
  );

  return isCheckedArray.includes(true);
}

export { isAnyCheckboxChecked };
