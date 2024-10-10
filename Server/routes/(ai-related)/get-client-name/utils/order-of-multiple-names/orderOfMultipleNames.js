import { realNoNamesFoundResponse } from "../../route.js";
import getOccurenceNoAndFirstXtersNo from "./getOccurenceNoAndFirstXtersNo.js";

export default async function orderOfMultipleNames(finalName, prompt) {
  // Split the names by comma and trim any extra spaces
  let nameParts = finalName.split(",").map((name) => name.trim());

  // Arrays to store objects and formatted name strings
  let occurenceObjArray = [];
  let nameObjWithOccurenceArray = [];

  // Loop through the nameParts array
  for (let name of nameParts) {
    const nameOccurentObj = getOccurenceNoAndFirstXtersNo(prompt, name);
    const { occurrences } = nameOccurentObj;

    // Only push to arrays if occurrences is greater than 0
    if (occurrences > 0) {
      nameObjWithOccurenceArray.push({ name, occurrences });
      occurenceObjArray.push({ ...nameOccurentObj, name });
    }
  }

  // Log the valid name parts
  console.log("occurenceObjArray", occurenceObjArray);

  // Handle cases based on the length of valid names
  if (occurenceObjArray.length == 1) {
    return `${nameObjWithOccurenceArray[0].name} - ${nameObjWithOccurenceArray[0].occurrences}`;
  } else {
    // Sort the occurrenceObjArray based on charactersBeforeFirst
    occurenceObjArray = sortByCharactersBeforeFirst(occurenceObjArray);

    // Map the sorted array back to the original name format
    const sortedNameArray = occurenceObjArray.map(
      (obj) => `${obj.name} -${obj.occurrences}`
    );

    console.log("sortedNameArray", sortedNameArray);

    if (!sortedNameArray || sortedNameArray.length == 0) {
      return realNoNamesFoundResponse;
    }

    return sortedNameArray.join(", ");
  }
}

function sortByCharactersBeforeFirst(arr) {
  return arr.sort((a, b) => a.charactersBeforeFirst - b.charactersBeforeFirst);
}
