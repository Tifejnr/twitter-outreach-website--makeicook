export default function removeAndTextFromClienName(phrase) {
  // Use a regular expression to replace " and " with a single space
  // The \b ensures that "and" is matched only as a whole word
  // The g flag ensures that all occurrences of " and " are replaced
  let phraseAndRemoved = phrase.replace(/\band\b/g, "");
  phraseAndRemoved = phrase.replace(/\b&\b/g, "");

  return phraseAndRemoved;
}
