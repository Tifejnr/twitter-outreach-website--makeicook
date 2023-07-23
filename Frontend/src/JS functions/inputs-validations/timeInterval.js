function timeIntervalSliderVal(value, timeIntervalEl) {
  const minValue = 1;
  const maxValue = 20;

  if (value < minValue) {
    const timeIntervalError = `Time interval cannot be ${minValue - 1} minute`;
    setErrorTextarea(timeIntervalEl, timeIntervalError);
    return false;
  }
  if (value > maxValue) {
    const timeIntervalError = `Time interval cannot be more than ${maxValue} minutes`;
    setErrorTextarea(timeIntervalEl, timeIntervalError);
    return false;
  }

  setSuccessTextarea(timeIntervalEl);

  return true;
}

export { timeIntervalSliderVal };
