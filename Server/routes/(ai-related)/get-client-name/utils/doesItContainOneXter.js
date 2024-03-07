export default function containsOneCharacter(str) {
  // Use regex to check if the string contains only one letter or character
  return /^[a-zA-Z0-9]$/.test(str);
}
