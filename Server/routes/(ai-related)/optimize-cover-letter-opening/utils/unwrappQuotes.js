export default function unwrapQuotes(text) {
  // Check if text starts and ends with the same quote type
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1); // Remove the first and last character (quotes)
  }
  return text; // Return text as-is if not fully wrapped in quotes
}
