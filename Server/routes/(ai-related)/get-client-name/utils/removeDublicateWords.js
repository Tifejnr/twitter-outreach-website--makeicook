export default function removeDuplicateWords(statement) {
  // Split the statement into an array of words
  const words = statement.trim().split(/\s+/);

  // Create a map to count occurrences of each word
  const wordCount = {};
  words.forEach((word) => {
    const lowerCaseWord = word.toLowerCase(); // Normalize word to lowercase
    wordCount[lowerCaseWord] = (wordCount[lowerCaseWord] || 0) + 1;
  });

  // Filter words to keep only those that occur exactly once
  const uniqueWords = words.filter((word) => {
    const lowerCaseWord = word.toLowerCase(); // Normalize word to lowercase
    return wordCount[lowerCaseWord] === 1; // Keep words that occur exactly once
  });

  // Join the unique words back into a cleaned statement
  const cleanedStatement = uniqueWords.join(" ");

  return cleanedStatement;
}
