
function validateUsername(input) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";

  if (isEmpty) return console.log("email is empty");

   if (!input.startsWith('@')) return console.log("Username must start with @")

  const slicedInput = input.slice(1);

  return slicedInput 
}

export {validateUsername}