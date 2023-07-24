const successColor = "#09c372";

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  element.style.borderColor = successColor;
};

function setSliderSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.style.borderColor = successColor;
}

export { setSuccess, setSliderSuccess };
