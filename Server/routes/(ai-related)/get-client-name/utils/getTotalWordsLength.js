export default function getTotalWordsLength(text) {
  let words = text.split(/\s+/); // Split by whitespace to get words

  // Calculate the number of words
  let totalWords = words.length;
  return totalWords;
}
