import { setSliderError } from "./setError";
import { setSliderSuccess } from "./setSucess";

function timeIntervalSliderVal(value, timeIntervalEl) {
  const minValue = 0;
  const maxValue = 20;

  if (value < minValue) {
    const timeIntervalError = `Time interval cannot be ${minValue} seconds`;
    setSliderError(timeIntervalEl, timeIntervalError);
    return false;
  }
  if (value > maxValue) {
    const timeIntervalError = `Time interval cannot be more than ${maxValue} seconds`;
    setSliderError(timeIntervalEl, timeIntervalError);
    return false;
  }

  return true;
}

export { timeIntervalSliderVal };
