export default function closeMenuBar() {
  const navCheckBox = document.getElementById(
    "nav__checkbox"
  ) as HTMLInputElement | null;

  if (!navCheckBox) return;

  navCheckBox.checked = false;
}
