function removeAndTextFromClientName(phrase) {
  let phrase = phrase.trim();
  let phraseAndRemoved = phrase.replace(/\band\b|\b&\b/g, "");
  return phraseAndRemoved;
}
