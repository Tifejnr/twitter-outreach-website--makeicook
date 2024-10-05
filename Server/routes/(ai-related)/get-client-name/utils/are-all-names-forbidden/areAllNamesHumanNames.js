import {
  getStraightAiResponse,
  realNoNamesFoundResponse,
} from "../../route.js";

export default async function areAllNamesHumanNames(finalName, prompt) {
  // Split the names by comma and trim any extra spaces
  let nameParts = finalName.split(",").map((name) => name.trim());

  // Create an empty array to store valid human names
  let validNameParts = [];

  // Loop through the nameParts array
  for (let name of nameParts) {
    const confirmNamePrompt = `
    Return "Yes" or "No" only.
    
    Is ${name} found as a given name in any country in the world ?
`;

    const isNameAHumanName = await getStraightAiResponse(
      confirmNamePrompt,
      prompt
    );

    // Check if the response doesn't include "No"
    if (!isNameAHumanName.includes("No")) {
      validNameParts.push(name); // Push the valid name to the array
    }
  }

  // Log the valid name parts
  console.log("validNameParts", validNameParts);

  // Handle different cases based on the length of valid names
  if (validNameParts.length == 0) {
    finalName = realNoNamesFoundResponse;
  } else if (validNameParts.length == 1) {
    finalName = validNameParts[0];
  } else {
    // Join the remaining names back together
    finalName = validNameParts.join(", ");
  }

  return finalName;
}
