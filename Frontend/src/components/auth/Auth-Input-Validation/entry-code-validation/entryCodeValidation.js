export default function entryCodeValidation(entryCode) {
  if (entryCode === "") return { entryCodeError: "Entry code cannot be empty" };

  return true;
}
