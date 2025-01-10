export default function getCorrectWordCasing(str1, str2) {
  // Helper function to check the casing of a string
  function detectCasingCondition(string) {
    if (
      string[0] === string[0].toUpperCase() &&
      string.slice(1) === string.slice(1).toLowerCase()
    ) {
      return "capitalized";
    } else if (string === string.toUpperCase()) {
      return "uppercase";
    } else if (string === string.toLowerCase()) {
      return "lowercase";
    } else {
      return "capitalized";
    }
  }

  // Helper function to apply a specific casing condition
  function applyCasing(string, condition) {
    switch (condition) {
      case "capitalized":
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      case "uppercase":
        return string.toUpperCase();
      case "lowercase":
        return string.toLowerCase();
      default:
        return string;
    }
  }

  // Detect the casing condition of the first string
  const casingCondition = detectCasingCondition(str1);

  // Apply the casing condition to the second string

  return applyCasing(getLastSplitText(str2), casingCondition);
}

function getLastSplitText(response) {
  // Check if the response contains the delimiter
  if (response.includes("→")) {
    // Split the response using the delimiter
    const parts = response.split("→");
    // Return the last segment
    return parts[parts.length - 1];
  }
  // Return null or an appropriate value if no split occurs
  return response;
}
