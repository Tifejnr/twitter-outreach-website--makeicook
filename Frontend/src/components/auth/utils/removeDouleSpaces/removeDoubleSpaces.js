export default function removeDoubleSpaces(text: string) {
  return text.trim().replace(/\s{2,}/g, " ");
}
