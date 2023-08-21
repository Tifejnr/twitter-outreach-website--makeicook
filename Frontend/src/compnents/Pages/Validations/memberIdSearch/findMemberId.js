export default function findMemberIdThroughInnerHtml(paramsForboardIdAndName) {
  const memberCheckboxesArray = paramsForboardIdAndName.memberCheckboxesArray;
  const allUserMemberDetail = paramsForboardIdAndName.allUserMemberDetail;

  let nameAddingObjArray = [];

  const memberDetailsObj = memberCheckboxesArray.map((checkbox, index) => {
    if (!checkbox.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const memberUsernameEl = document.getElementById(
      `username${arrayNoFromId}`
    );
    const memberUsernameWithAt = memberUsernameEl.textContent;
    const memberUsername = memberUsernameWithAt.slice(1);

    const foundMember = allUserMemberDetail.find(
      (memberDetail) => memberDetail.username === memberUsername
    );

    if (!foundMember) return console.log("board not found");
    const memberId = foundMember.id;
    const memberFullName = foundMember.fullName;

    const checkedMemberObj = {
      memberId,
      memberFullName,
    };

    nameAddingObjArray.push(checkedMemberObj);
  });

  if (!memberDetailsObj) return "";

  return { nameAddingObjArray };
}
