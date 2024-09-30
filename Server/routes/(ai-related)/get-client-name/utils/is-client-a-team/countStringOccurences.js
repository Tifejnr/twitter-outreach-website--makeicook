export default function countStringOccurrences(searchString, sentence) {
  // Create a regular expression to find all occurrences of the search string, ignoring case sensitivity
  const regex = new RegExp(searchString, "gi"); // 'i' flag added for case-insensitive matching

  // Match the searchString in the sentence
  const matches = sentence.match(regex);

  // Return the count (0 if no matches are found)
  return matches ? matches.length : 0;
}
