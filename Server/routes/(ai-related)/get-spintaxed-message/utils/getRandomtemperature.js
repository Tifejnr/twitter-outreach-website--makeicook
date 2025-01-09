export default function getRandomTemperature(lastPickedTemperature) {
  let newTemperature;
  do {
    newTemperature = (Math.random() * 0.8 + 0.1).toFixed(1); // Generates a number between 0.1 and 0.9 with 1 decimal place
    newTemperature = parseFloat(newTemperature); // Converts the string back to a number
  } while (
    newTemperature === lastPickedTemperature ||
    Math.abs(newTemperature - lastPickedTemperature) <= 0.2 // Adjust the condition to match the scaled values
  );

  return newTemperature;
}
