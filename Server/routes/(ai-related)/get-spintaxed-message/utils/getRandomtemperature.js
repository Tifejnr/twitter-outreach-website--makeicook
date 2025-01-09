export default function getRandomTemperature(lastPickedTemperature) {
  console.log("lastPickedTemperature", lastPickedTemperature);
  let newTemperature;
  do {
    newTemperature = Math.random() * 0.8 + 0.1; // Generates a number between 0.1 and 0.9
  } while (
    newTemperature === lastPickedTemperature ||
    Math.abs(newTemperature - lastPickedTemperature) <= 2
  );

  console.log("newTemperature", newTemperature);

  return newTemperature;
}
