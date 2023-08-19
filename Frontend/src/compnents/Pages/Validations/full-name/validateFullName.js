import fullNamesValidation from "./fullNamesValidation";

export default function validateFullName(input) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";

  const isEmptyMessage = "Members' full names cannot be empty";

  if (isEmpty) return { fullNameValError: isEmptyMessage };

  const inputsSplitted = input.split(",");

  const areFullnamesValid = fullNamesValidation(input);

  if (!areFullnamesValid.invalidDetailsIndexArray) return true;

  const oneOnlyInvalidMessage = `Full name is invalid`;

  if (areFullnamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1)
    return { fullnameValError: oneOnlyInvalidMessage };

  //add 1 to all the indexes to make users know it's on no 1 instead if 0
  const oneAddedToAllIndexes = areFullnamesValid.invalidDetailsIndexArray.map(
    (value) => value + 1
  );
  const invalidIndexesJoined = oneAddedToAllIndexes.join(", ");

  const invalidFullnamesMessage = `Full names ${invalidIndexesJoined} is invalid`;
  if (areFullnamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1)
    return { fullnameValError: invalidFullnamesMessage };
}
