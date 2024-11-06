import fetchDataFromSheet from "../../../../server-utils/fetch-data-from-sheet/fetchDataFromSheet.js";
import { getDateAndEntryCodeObj } from "./getDateAndEntryCodeObj.js";
const sheetLink =
  "https://docs.google.com/spreadsheets/d/1hh50lbbyBV-lbZpc6PxV0Ow_kd6qZwgykP__Yn8NDzg/gviz/tq?";

export default async function isJosephEntryCodesArrayValid(inputedEntryCode) {
  if (!inputedEntryCode) return false;

  const allEntryCodesArray = await fetchDataFromSheet(sheetLink, 0);

  const entryCodesAndDatesArray = getDateAndEntryCodeObj(allEntryCodesArray);

  const isEntryCodePresent = entryCodesAndDatesArray.find(
    (element) => element.entryCode.trim() == inputedEntryCode.trim()
  );

  if (!isEntryCodePresent) return false;

  const { dateItWasGiven } = isEntryCodePresent;

  const isDateOfRegOver24hours = isOver24Hours(dateItWasGiven);

  if (!isDateOfRegOver24hours) return true;

  return null;
}

function isOver24Hours(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate - givenDate;

  // 24 hours in milliseconds
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  return timeDifference > twentyFourHoursInMs;
}
