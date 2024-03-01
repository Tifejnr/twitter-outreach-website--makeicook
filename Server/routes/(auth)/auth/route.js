import express from "express";
const router = express.Router();
import getSecretKeys from "../../../envVariables/envVariables";
// import signInDetailsValidation from "@/app/server-utils/joi-validations/signInValidation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "@/app/server-utils/database/usersDb";
import getMongoKeyAndConnect from "@/app/server-utils/database/mongoDbConnect";

//connect to mongo deb
getMongoKeyAndConnect();

router.post("/", async (req, res) => {
  //get request sent
  const bodyRequest = await req.body;
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

  // console.log(cookies().get("xAuth"));

  const { error } = signInDetailsValidation(bodyRequest);

  if (error) return Response.json({ emailError: error.details[0].message });

  const accountUser = await user.findOne({ email: bodyRequest.email });

  if (!accountUser)
    return Response.json({ invalidLoginDetails: "Invalid email or password" });
  const validPassword = await bcrypt.compare(
    bodyRequest.password,
    accountUser.password
  );
  if (!validPassword)
    return Response.json({ invalidLoginDetails: "Invalid email or password" });
  const token = jwt.sign(
    { _id: accountUser._id, isPaid: accountUser.isPaid },
    JWT_PRIVATE_KEY
  );

  // cookies().set("xAuth", token, {
  //   maxAge: 1209600000,
  //   httpOnly: true,
  //   secure: true,
  // });

  return Response.json({ token });
});

export default router;
