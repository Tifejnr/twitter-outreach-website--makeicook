export default function replaceWordsWithSynonyms(sentence, synonymsArray) {
  // Iterate through each object in the synonymsArray
  for (const { word, synonym } of synonymsArray) {
    // Replace all occurrences of the word with its synonym using a regular expression
    const regex = new RegExp(`\\b${word}\\b`, "gi"); // Match whole words, case-insensitive
    sentence = sentence.replace(regex, synonym);
  }

  // Return the modified sentence
  return sentence;
}
