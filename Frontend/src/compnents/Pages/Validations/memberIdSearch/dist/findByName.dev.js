"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMemberIdByName = findMemberIdByName;

function findMemberIdByName(allUserMemberDetail, memberName) {
  return allUserMemberDetail.find(function (memberDetail) {
    return memberDetail.fullName === memberName;
  });
}