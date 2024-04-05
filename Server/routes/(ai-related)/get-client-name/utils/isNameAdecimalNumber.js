const isItADecimalNoRegex = /^[-+]?\d*\.?\d+$/;

export default function isNameAdecimalNumber(phrase) {
  return isItADecimalNoRegex.test(phrase);
}
