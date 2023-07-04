const admin = require("../../FirebaseInit/firebase-admin");
const auth = require("firebase-admin-auth");

async function updateUserData(uid, updatedData) {
  try {
    const firestore = admin.firestore();
    const userRef = firestore.collection("Users").doc(uid);

    if (!userRef) return console.log("User collection does not exist");

    await userRef.update(updatedData);

    console.log("Data upadted successfully to Firestore");
  } catch (error) {
    console.error("Error saving data to Firestore:", error);
  }
}

// const data = {
//   trello_token: "miamioooo11tu181tik11o71tf18f1o1f1",
// };

// upadteUserData(uid, data);

exports.updateUserData = updateUserData;
