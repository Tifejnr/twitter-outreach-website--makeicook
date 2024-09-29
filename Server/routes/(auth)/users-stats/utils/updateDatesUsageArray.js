export default function updateDatesUsageArray(datesArray, currentDate) {
  // Check if the array has 5 elements
  if (datesArray.length >= 5) {
    // Remove the first element
    datesArray.shift();
  }

  // Add the new date at the end of the array
  datesArray.push(currentDate);

  return datesArray; // Return the updated array
}
