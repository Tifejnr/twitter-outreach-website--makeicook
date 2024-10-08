function getOccurenceNoAndFirstXtersNo(statement, substring) {
  // Find all occurrences of the substring in the statement
  let regex = new RegExp(substring, "g");
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
