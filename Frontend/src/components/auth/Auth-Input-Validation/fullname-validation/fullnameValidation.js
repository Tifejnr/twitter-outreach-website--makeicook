// Define the regular expression pattern for "first name last name" format
const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

export default function fullnameValidation(fullName: string) {
  if (fullName === "")
    return { fullnameValidationError: "Full name cannot be empty" };

  // Test the full name against the pattern to ensure its firstname lastname format
  if (!fullNameRegex.test(fullName))
    return {
      fullnameValidationError: `Invalid format: firstname   lastname`,
    };

  return true;
}
