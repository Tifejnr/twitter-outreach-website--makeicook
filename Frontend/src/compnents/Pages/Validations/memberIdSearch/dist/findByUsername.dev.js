"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMemberIdByUsername = findMemberIdByUsername;

function findMemberIdByUsername(allUserMemberDetail, memberUsername) {
  return allUserMemberDetail.find(function (memberDetail) {
    return memberDetail.username === memberUsername;
  });
}