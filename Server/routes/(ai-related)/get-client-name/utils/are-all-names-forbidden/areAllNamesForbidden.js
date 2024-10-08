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
    return nameParts[0];
  } else {
    return nameParts.join(", ");
  }
}

// `
// On the job search page, click on the job you would like to apply for to view its details.

// Click the "Apply Now" button.

// Above the cover letter input box, you will see a new layout. The last button on the right contains the client’s name, which is automatically fetched.

// Click the button to copy the name and use it to personalize your cover letter.

// In cases where multiple names are found, indicating that the client account is managed by more than one person, the client name is prefixed by "Names -" followed by a list of the names found.

// It's up to you to decide whether to use one of the names or simply address the client with "Hi."

// In scenarios where no name is found, "No name was found" is displayed. In such cases, use "Hi" for personalization.

// Additionally, if the client has no job history or no text-based feedback in their job history, "client has no job history" is displayed. Use "Hi" for personalization in this situation too.

// Note: Credits are only deducted each time you access the proposal submission page.
// ``
// First of all, pin the WFR Toolkit extension to your toolbar.

// To do this, locate the extensions icon on the toolbar

// Click the the extensions icon

// find WFR Toolkit extensions from the extensions list.

// Click the pin button to pin it to your toolbar.

// You should see it pinned to your toolbar now.

// Click the WFR Toolkit icon on your toolbar to go to the extension homepage.

// On the left side of the extension homepage, locate "Text template" on the sections list.

// Click the text templates list to naivagte to Text templates section.

// On the text template section, locate "Create new text template" button.

// click "Create new text template" button to create new template.

// Enter your template name.

// Locate the text input box.

// Paste your text into the input box.

// Locate and click the "Save template" button.

// Locate and click the "Go back" button.

// Close the tab.

// Try to apply to any job so you can access the proposal submission page where you will be able to use the text templates.

// Locate "CTT" button by the far right of the cover letter input box.

// Click the CTT button to display a popover showing all saved text templates.

// Locate the name of the text template you will like to copy and click "copy".

// Paste the copied text.

// `;
