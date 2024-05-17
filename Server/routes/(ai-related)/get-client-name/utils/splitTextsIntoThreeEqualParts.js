export default function splitTextIntoThreeParts(text) {
  // Split the text into individual words
  let words = text.split(/\s+/); // Split by whitespace to get words

  // Calculate the number of words
  let totalWords = words.length;

  // Calculate the points to split the words into three parts
  let firstSplitPoint = Math.floor(totalWords / 3);
  let secondSplitPoint = Math.floor((2 * totalWords) / 3);

  // Join words to form three parts
  let part1 = words.slice(0, firstSplitPoint).join(" ");
  let part2 = words.slice(firstSplitPoint, secondSplitPoint).join(" ");
  let part3 = words.slice(secondSplitPoint).join(" ");

  // Replace empty parts with "Hi there"
  if (!part1) part1 = "Hi there";
  if (!part2) part2 = "Hi there";
  if (!part3) part3 = "Hi there";

  // Return the three parts
  return {
    part1,
    part2,
    part3,
  };
}
