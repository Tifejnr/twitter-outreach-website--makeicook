const errorColor = "#ff3860";

export default function setError(element, message) {
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  errorDisplay.style.color = errorColor;
  element.style.borderColor = errorColor;
}
