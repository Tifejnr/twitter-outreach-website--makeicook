function commaSeperationRegex(input) {
  const pattern = /^[^\s,]+(?:\s*,\s*[^\s,]+)*$/;
  const result = pattern.test(input);
  return result;
}

export { commaSeperationRegex };
