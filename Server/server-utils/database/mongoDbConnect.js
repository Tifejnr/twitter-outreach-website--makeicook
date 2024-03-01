import mongoose from "mongoose";
import getSecretKeys from "../../envVariables/envVariables.js";

export default async function getMongoKeyAndConnect() {
  const keysObjects = getSecretKeys();
  const mongoDB_string = keysObjects.mongoDB_string;

  const connectionStatus = mongoose.connection.readyState;

  if (connectionStatus === 1) {
    console.log("connected");
    return;
  }

  if (connectionStatus === 2) {
    console.log("connecting...");
    return;
  }

  try {
    mongoose.connect(mongoDB_string);

    console.log("connceted to mongo db now oo");

    return true;
  } catch (error) {
    console.error("could not connect", error);
  }
}
