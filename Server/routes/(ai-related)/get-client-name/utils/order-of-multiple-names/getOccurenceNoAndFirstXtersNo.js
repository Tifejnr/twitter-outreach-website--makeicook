export default function getOccurenceNoAndFirstXtersNo(statement, substringRaw) {
  const substring = ` ${substringRaw} `.trim();
  // Find all occurrences of the substring in the statement (case insensitive)
  let regex = new RegExp(substring, "gi"); // Added 'i' flag for case insensitivity
  let matches = [...statement.matchAll(regex)];

  // Number of times the substring was found
  let occurrences = matches.length;

  // Find the number of characters before the first occurrence
  let firstOccurrenceIndex = occurrences > 0 ? matches[0].index : -1;

  return {
    occurrences: occurrences,
    charactersBeforeFirst: firstOccurrenceIndex,
  };
}
