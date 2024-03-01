export default async function updateAllUsersData(user: any) {
  const result = await user.updateMany({}, { $set: { jobsCompleted: 10 } });
  console.log(`${result.modifiedCount} documents updated`);
}
