import eachNameAgainstOtherNamesSimilarityCheck from "./eachNameSimilarityCheck";
import removeDuplicateNameFromTheEnd from "./removeDuplicateNameFromTheEnd";

export default function checkAllNamesByEachOther(names) {
  names.trim();
  const namesArray = names.replace(/-/g, "").split(", ");
  const firstArrayNo = 0,
    secondArrayNo = 1,
    thirdArrayNo = 2,
    fourthArrayNo = 3,
    fifthArrayNo = 4,
    sixthArrayNo = 5,
    seventhArrayNo = 6,
    eightArrayNo = 7;

  let firstNameResponse,
    secondNameResponse,
    thirdNameResponse,
    fourthNameResponse,
    fifthNameResponse,
    sixthNameResponse,
    seventhNameResponse,
    eightNameResponse;

  // Check each name against every other name
  //firstname result

  firstNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    firstArrayNo,
    namesArray
  );

  //second

  secondNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    secondArrayNo,
    namesArray
  );

  //thirdName result
  thirdNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    thirdArrayNo,
    namesArray
  );
  //fourthName result
  fourthNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    fourthArrayNo,
    namesArray
  );

  //fifthName result
  fifthNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    fifthArrayNo,
    namesArray
  );

  //sixthName result
  sixthNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    sixthArrayNo,
    namesArray
  );
  //sevenethName result
  seventhNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    seventhArrayNo,
    namesArray
  );
  //rightName result
  eightNameResponse = eachNameAgainstOtherNamesSimilarityCheck(
    eightArrayNo,
    namesArray
  );

  //inputting them back in the name array

  if (firstNameResponse) {
    namesArray[firstArrayNo] = firstNameResponse;
  }

  if (secondNameResponse) {
    namesArray[secondArrayNo] = secondNameResponse;
  }
  if (thirdNameResponse) {
    namesArray[thirdArrayNo] = thirdNameResponse;
  }

  if (fourthNameResponse) {
    namesArray[fourthArrayNo] = fourthNameResponse;
  }
  if (fifthNameResponse) {
    namesArray[fifthArrayNo] = fifthNameResponse;
  }

  if (sixthNameResponse) {
    namesArray[sixthArrayNo] = sixthNameResponse;
  }

  if (seventhNameResponse) {
    namesArray[seventhArrayNo] = seventhNameResponse;
  }

  if (eightNameResponse) {
    namesArray[eightArrayNo] = eightNameResponse;
  }

  const arrayWithDuplicatesRemoved = removeDuplicateNameFromTheEnd(namesArray);

  return arrayWithDuplicatesRemoved;
}
