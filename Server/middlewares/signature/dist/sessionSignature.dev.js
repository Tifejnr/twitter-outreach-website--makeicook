"use strict";

function generateSignature() {
  var length = 19;
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var signature = "";

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    signature += characters[randomIndex];
  }

  return signature;
}

exports.generateSignature = generateSignature;