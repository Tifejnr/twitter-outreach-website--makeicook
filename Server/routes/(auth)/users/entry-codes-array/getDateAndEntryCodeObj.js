export function getDateAndEntryCodeObj(entryCodeArrayRaw) {
  console.log("entryCodeArrayRaw", entryCodeArrayRaw);
  const entryCodeArray = Array.from(entryCodeArrayRaw).map((item) => {
    const string = String(item); // Convert to string
    const entryCode = string.trim().split("||");

    return {
      entryCode: entryCode[0].trim(),
      dateItWasGiven: entryCode[1].trim(),
    };
  });

  return entryCodeArray;
}
