
function validateUsername(input) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";

  if (isEmpty) return console.log("email is empty");

  return true;
}

export {validateUsername}