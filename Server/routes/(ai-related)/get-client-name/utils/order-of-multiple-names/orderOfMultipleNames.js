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

// `
// Partnership Opportunity with WFR Toolkit - 30% recurring commission

// Hi boss, hope you good! I’m reaching out to introduce you to a tool I developed that has been gaining traction among Upwork freelancers – WFR Toolkit.

// It’s designed to help freelancers streamline their workflow and increase their chances of winning projects.

// Here are some key benefits of the WFR Toolkit for Upwork freelancers:

// Automatic client name retrieval for personalized cover letters, saving valuable time and effort when applying for jobs.

// Optimize your cover letter's opening lines by seeing exactly what clients see first, improving your chances of getting noticed and hired.

// Client experience summaries based on previous freelancers’ feedback, offering insights into whether a client is a good match—this helps freelancers avoid clients who may negatively impact their Job Success Score (JSS).

// Save and reuse text templates, such as cover letter templates or project links, eliminating repetitive typing and saving time during the application process.

// Job post displayed directly above the cover letter input box, making it easier to reference the job details without scrolling back and forth.

// If this sounds like something your audience might benefit from, I’d love for you to check it out and see if it aligns with what you’d like to promote.

// You can explore the tool here:
// https://chromewebstore.google.com/detail/wfr-toolkit-up-your-upwor/chpmkkhcpfhjdkkeiggiicfejnkhcidb?hl=en&pli=1

// To sweeten the deal, I’m offering a 30% recurring commission on all credit purchases made by any users you refer.

// Is this something you are open to ?
// `
