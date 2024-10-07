import forbiddenNamesInclusionArray from "../../forbiddenNamesInclusion.js";
import { realNoNamesFoundResponse } from "../../route.js";

export default function areAllNamesForbidden(finalName) {
  // Split the names by comma and trim any extra spaces
  let nameParts = finalName.split(",").map((name) => name.trim());

  // Filter out any forbidden names
  nameParts = nameParts.filter((name) => {
    const lowerName = name.toLowerCase();
    return !forbiddenNamesInclusionArray.some((forbiddenName) => {
      const escapedForbiddenName = forbiddenName
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedForbiddenName}\\b`);
      return regex.test(lowerName);
    });
  });

  console.log("nameParts", nameParts);

  if (nameParts.length == 0) {
    return realNoNamesFoundResponse;
  }

  if (nameParts.length == 1) {
    finalName = nameParts[0];
  } else {
    finalName = nameParts.join(", ");
  }

  return finalName;
}
