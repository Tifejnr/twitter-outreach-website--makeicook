import user from "../../../../server-utils/database/usersDb.js";

export default async function resetStatsBy12AmDaily() {
  try {
    // Reset all users' `hasItBeenUsedToday` to false and increment `totalNoOfPossibleUsageIfUsedDailyOnly`
    await user.updateMany(
      {}, // No filter, apply to all users
      {
        $set: { hasItBeenUsedToday: false }, // Reset to false
        $inc: { totalNoOfPossibleUsageIfUsedDailyOnly: 1 }, // Increment by 1
      }
    );
    console.log("Stats reset successfully for all users");
  } catch (error) {
    console.error("Error resetting stats: ", error);
  }
}
