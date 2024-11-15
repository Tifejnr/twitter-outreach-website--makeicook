const convertArrayToTweets = (array, label) => {
  return array
    .map((text, index) => `${label} [${index + 1}]: ${text}`)
    .join("\n"); // Join each formatted string with a newline
};

export default convertArrayToTweets;
