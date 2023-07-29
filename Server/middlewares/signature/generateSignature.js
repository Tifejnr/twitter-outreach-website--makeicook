function generateSignature() {
  const length = 18;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let signature = "";

  // Get the current date and time as a string
  const currentDate = new Date().toISOString();

  // Remove characters that are not suitable for the signature
  const cleanDate = currentDate.replace(/[-:.TZ]/g, "");

  // Combine the date and random characters to form the signature
  signature += cleanDate;
  while (signature.length < length) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    signature += characters[randomIndex];
  }

  // Trim the signature to the desired length (in case the date string is too long)
  signature = signature.slice(0, length);

  return signature;
}

exports.generateSignature = generateSignature;
