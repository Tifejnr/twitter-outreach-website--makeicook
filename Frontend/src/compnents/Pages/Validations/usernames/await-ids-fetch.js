import getMemberIdByUsername from "./getMemberIdByUsername";

export default async function awaitIdsFetch(usernameSplitted, boardIdsObj) {
  let usernameAddingArray = [];
  // Create an array to hold promises
  const promises = usernameSplitted.map(async (memberUsername) => {
    const getMemberIdServer = await getMemberIdByUsername(
      memberUsername,
      boardIdsObj
    );

    const memberIdFound = await getMemberIdServer;

    if (!memberIdFound) return;
    const memberId = memberIdFound.memberIdFound;
    const usernameAddingObj = {
      memberId,
      memberUsername,
    };

    usernameAddingArray.push(usernameAddingObj);
  });

  await Promise.all(promises);

  console.log(usernameAddingArray);
}
