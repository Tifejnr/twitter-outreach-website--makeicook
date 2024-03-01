export default function removeDoubleSpaces(text) {
  return text.trim().replace(/\s{2,}/g, " ");
}
