commaSeperationRegex("haha@gmail.com, ahahh@gmail.com, anna@gmail.com");
function commaSeperationRegex(input) {
  const pattern = /^[^\s,]+(?:\s*,\s*[^\s,]+)*$/;
  const result = pattern.test(input);
  return result;
}

export { commaSeperationRegex };
