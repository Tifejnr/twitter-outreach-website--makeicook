import fullNamesValidation from "./fullNamesValidation";

export default function validateFullName(input) {
  const areFullnamesValid = fullNamesValidation(input);

  if (!areFullnamesValid.invalidDetailsIndexArray) return true;

  const oneOnlyInvalidMessage = `Fullname must start with "@" symbol`;

  if (areFullnamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1)
    return { fullnameValError: oneOnlyInvalidMessage };

  //add 1 to all the indexes to make users know it's on no 1 instead if 0
  const oneAddedToAllIndexes = areFullnamesValid.invalidDetailsIndexArray.map(
    (value) => value + 1
  );
  const invalidIndexesJoined = oneAddedToAllIndexes.join(", ");

  const invalidFullnamesMessage = `Fullnames ${invalidIndexesJoined} must start with "@" symbol`;
  if (areFullnamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1)
    return { fullnameValError: invalidFullnamesMessage };
}
