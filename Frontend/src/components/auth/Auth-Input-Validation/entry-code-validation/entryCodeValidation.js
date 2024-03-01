export default function entryCodeValidation(entryCode: string) {
  if (entryCode === "") return { entryCodeError: "Entry code cannot be empty" }

  return true
}
