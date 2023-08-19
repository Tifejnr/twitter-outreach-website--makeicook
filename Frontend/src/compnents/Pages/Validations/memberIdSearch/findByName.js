function findMemberIdByName(allUserMemberDetail, memberName) {
  return allUserMemberDetail.find(
    (memberDetail) => memberDetail.fullName === memberName
  );
}

export { findMemberIdByName };
