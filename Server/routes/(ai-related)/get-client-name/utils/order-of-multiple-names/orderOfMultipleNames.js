import {
  getStraightAiResponse,
  realNoNamesFoundResponse,
} from "../../route.js";

export default async function orderOfMultipleNames(finalName, prompt) {
  // Split the names by comma and trim any extra spaces
  let nameParts = finalName.split(",").map((name) => name.trim());

  // Create an empty array to store valid human names
  let occurenceObjArray = [];
  let nameObjWithOccurenceArray = [];

  // Loop through the nameParts array
  for (let name of nameParts) {
    const nameOccurentObj = getOccurenceNoAndFirstXtersNo(prompt, name);

    const { occurrences, charactersBeforeFirst } = nameOccurentObj;

    nameObjWithOccurenceArray = `${name}- ${occurrences}`;

    occurenceObjArray.push(nameOccurentObj);
  }

  // Log the valid name parts
  console.log("occurenceObjArray", occurenceObjArray);
  console.log("nameObjWithOccurenceArray", nameObjWithOccurenceArray);

  // Handle different cases based on the length of valid names
  if (occurenceObjArray.length == 1) {
    return nameObjWithOccurenceArray[0];
  } else {
    // Join the remaining names back together
    return nameObjWithOccurenceArray.join(", ");
  }

  //   return finalName;
}
