"use strict";

function generateSignature() {
  var length = 18;
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var signature = ""; // Get the current date and time as a string

  var currentDate = new Date().toISOString(); // Remove characters that are not suitable for the signature

  var cleanDate = currentDate.replace(/[-:.TZ]/g, ""); // Combine the date and random characters to form the signature

  signature += cleanDate;

  while (signature.length < length) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    signature += characters[randomIndex];
  } // Trim the signature to the desired length (in case the date string is too long)


  signature = signature.slice(0, length);
  return signature;
}

exports.generateSignature = generateSignature;