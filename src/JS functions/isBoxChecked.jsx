let succes;

function isBoxChecked() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  succes = [];

  Array.from(allCheckboxes).map((checkbox, index) => {
    const checkboxEl = document.getElementById(`check${index}`);

    if (!checkboxEl.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const nameOfBoard = boardEl.innerHTML;

    console.log(nameOfBoard);

    return new AddChecked(arrayNoFromId);
  });
}
