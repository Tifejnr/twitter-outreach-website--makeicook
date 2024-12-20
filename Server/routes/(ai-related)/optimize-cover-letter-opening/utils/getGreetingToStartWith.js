const clientHasNoJobHistoryText = "Client has no job history";
const errorOccuredMessage = "Check your internet, and retry";
const hiText = "Hi, ";
const noNamesFoundText = "No names found";

export default function getGreetingToStartWith(clientName) {
  if (!clientName) return hiText;

  const invalidNameToShowArray = [
    errorOccuredMessage,
    clientHasNoJobHistoryText,
    noNamesFoundText,
  ];

  const isUsingHiOnlyBetter = invalidNameToShowArray.find(
    (existingItem) => existingItem.trim() == clientName.trim()
  );

  const isItMultipleNames = clientName.includes("Names -");

  if (isUsingHiOnlyBetter || isItMultipleNames) {
    return hiText;
  }

  return `Hi ${clientName},`;
}
