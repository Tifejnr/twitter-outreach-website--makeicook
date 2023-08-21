"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findMemberIdThroughInnerHtml;

function findMemberIdThroughInnerHtml(paramsForboardIdAndName) {
  var memberCheckboxesArray = paramsForboardIdAndName.memberCheckboxesArray;
  var allUserMemberDetail = paramsForboardIdAndName.allUserMemberDetail;
  var nameAddingObjArray = [];
  var memberDetailsObj = memberCheckboxesArray.map(function (checkbox, index) {
    if (!checkbox.checked) return false;
    var checkboxId = checkbox.id;
    var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
    var memberUsernameEl = document.getElementById("username".concat(arrayNoFromId));
    var memberUsernameWithAt = memberUsernameEl.textContent;
    var memberUsername = memberUsernameWithAt.slice(1);
    var foundMember = allUserMemberDetail.find(function (memberDetail) {
      return memberDetail.username === memberUsername;
    });
    if (!foundMember) return console.log("board not found");
    var memberId = foundMember.id;
    var memberFullName = foundMember.fullName;
    var checkedMemberObj = {
      memberId: memberId,
      memberFullName: memberFullName
    };
    nameAddingObjArray.push(checkedMemberObj);
  });
  if (!memberDetailsObj) return "";
  return {
    nameAddingObjArray: nameAddingObjArray
  };
}