import user from "../../../../server-utils/database/usersDb.js";
import invalidEmailsListArray from "../../../(customer-requests)/email-users/invalidEmailsList.js";

async function deleteUsersWithEmail(targetEmail) {
  const allUsers = await user.find();

  const usersToDelete = allUsers.filter((user) => {
    return user.email.toLowerCase() === targetEmail.toLowerCase();
  });

  if (usersToDelete.length < 1)
    return console.log("No user found with that email.");

  console.log("Users to be deleted: ", usersToDelete);

  for (let userToDelete of usersToDelete) {
    try {
      // Check if the email is invalid (optional if you want to filter invalid emails before deletion)
      const isEmailInValid = invalidEmailsListArray.find((forbiddenEmail) => {
        const escapedEmail = forbiddenEmail
          .toLowerCase()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escapedEmail}\\b`);
        return regex.test(userToDelete.email.toLowerCase());
      });

      if (isEmailInValid) {
        console.log(
          `Cannot delete user with invalid email: ${userToDelete.email}`
        );
        continue;
      }

      // Delete the user from the database
      await user.deleteOne({ _id: userToDelete._id });
      console.log(`User with email ${userToDelete.email} has been deleted.`);
    } catch (error) {
      console.log(
        `Error deleting user with email ${userToDelete.email}:`,
        error
      );
    }
  }
}

export default deleteUsersWithEmail;