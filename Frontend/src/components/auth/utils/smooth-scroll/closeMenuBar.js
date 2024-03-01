export default function closeMenuBar() {
  const navCheckBox = document.getElementById("nav__checkbox");

  if (!navCheckBox) return;

  navCheckBox.checked = false;
}
