import mongoose from "mongoose";
import getSecretKeys from "../../../envVariables/envVariables.js";

export default async function makeIcookMongConnect() {
  const keysObjects = getSecretKeys();
  const mongoDB_string = keysObjects.makeICookMongoString;

  const connectionStatus = mongoose.connection.readyState;

  // 1: Connected, 2: Connecting
  if (connectionStatus === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionStatus === 2) {
    console.log("Currently connecting...");
    return;
  }

  try {
    // Await the connection
    await mongoose.connect(mongoDB_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully!");

    return true;
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    return false;
  }
}
