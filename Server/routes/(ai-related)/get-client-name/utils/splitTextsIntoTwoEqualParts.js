export default function splitTextIntoTwoParts(text) {
  // Split the text into individual words
  let words = text.split(/\s+/); // Split by whitespace to get words

  // Calculate the number of words
  let totalWords = words.length;

  // Calculate the midpoint to split the words into two parts
  let midpoint = Math.floor(totalWords / 2);

  // Join words to form two parts
  let promptPart1 = words.slice(0, midpoint).join(" ");
  let promptPart2 = words.slice(midpoint).join(" ");

  // Log the two parts to the console

  return {
    promptPart1,
    promptPart2,
  };
}
