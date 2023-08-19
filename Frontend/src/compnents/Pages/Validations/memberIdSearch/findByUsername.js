function findMemberIdByUsername(allUserMemberDetail, memberUsername) {
  return allUserMemberDetail.find(
    (memberDetail) => memberDetail.username === memberUsername
  );
}

export { findMemberIdByUsername };
