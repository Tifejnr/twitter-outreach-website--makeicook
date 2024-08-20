export default function getFirstName(fullName) {
  // Split the full name by spaces
  const nameParts = fullName.split(" ");

  // Return the first part of the array, which is the first name
  return nameParts[0];
}
