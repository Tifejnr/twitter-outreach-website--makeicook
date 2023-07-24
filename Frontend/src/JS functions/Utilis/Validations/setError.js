const errorColor = "#ff3860";

function setErrorTextarea(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.style.visibilty = "visible";
  errorDisplay.innerText = message;
  errorDisplay.style.color = errorColor;
  element.style.borderColor = errorColor;
}

function setSliderError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  errorDisplay.style.color = errorColor;
  inputControl.style.borderColor = errorColor;
}

export { setErrorTextarea, setSliderError };
