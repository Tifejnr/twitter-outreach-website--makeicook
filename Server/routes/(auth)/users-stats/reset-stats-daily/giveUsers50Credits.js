import user from "../../../../server-utils/database/usersDb.js"; // Ensure this path is correct

export default async function giveUsers50Credits() {
  try {
    // Reset all users' credits to 50
    await user.updateMany(
      {}, // No filter, apply to all users
      {
        $set: { credits: 50 }, // Reset credits to 50
      }
    );
    console.log("Credits set to 50 successfully for all users");
  } catch (error) {
    console.error("Error resetting credits: ", error);
  }
}
