export default function removeAndTextFromClienName(phrase) {
  const phraseEdited = removeSymbol(phrase);
  return phraseEdited.replace(/\band\b/g, "");
}

function removeSymbol(str) {
  return str.replace(/&/g, "");
}
