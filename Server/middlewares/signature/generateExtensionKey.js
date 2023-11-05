function generateExtensionKey(username) {
  const currentDate = new Date();

  // Format the date and time as a string (e.g., '20231105154231')
  const formattedTime = currentDate
    .toISOString()
    .replace(/[-T:]/g, "")
    .slice(0, 14);

  // Generate a random combination of letters and numbers
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += characters[Math.floor(Math.random() * characters.length)];
  }

  // Combine the username, formatted time, and random part to create an 18-character key
  const accountKey = `${username}${formattedTime}${randomPart}`;

  // Shuffle the characters in the account key
  const shuffledKey = shuffleString(accountKey);

  // Insert hyphens after every 4 characters
  const hyphenatedKey = insertHyphens(shuffledKey, 4);

  return hyphenatedKey;
}

function shuffleString(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function insertHyphens(str, interval) {
  const parts = [];
  for (let i = 0; i < str.length; i += interval) {
    parts.push(str.slice(i, i + interval));
  }
  return parts.join("-");
}

exports.generateExtensionKey = generateExtensionKey;
