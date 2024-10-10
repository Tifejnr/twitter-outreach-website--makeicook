export default function removeDuplicateNameFromTheEnd(arr) {
  const seen = new Set();
  const result = [];

  // Iterate through the array from the beginning
  for (const str of arr) {
    // If the string has not been seen, add it to the Set and result
    if (!seen.has(str)) {
      seen.add(str);
      result.push(str);
    }
  }

  return result;
}
