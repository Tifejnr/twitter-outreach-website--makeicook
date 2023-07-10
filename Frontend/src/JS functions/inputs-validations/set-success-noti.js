const successColor = "#09c372";

export default function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  element.style.borderColor = successColor;
}
