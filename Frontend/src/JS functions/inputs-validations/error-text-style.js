const errorColor = "#ff3860";

export default function displayErrorMessage(errorMessage) {
  const errorEl = document.getElementById("regErrorDisplay");
  errorEl.innerText = errorMessage;
  errorEl.style.color = errorColor;
}
