import express from "express";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

const isAccountAuthorizedRouter = express.Router();

isAccountAuthorizedRouter.post("/", async (req, res) => {
  //get request sent
  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return res.json({ nullJWTToken: true });

  const { messagesSentTrackingObj } = resultOfTokenValidation;

  if (resultOfTokenValidation.decodedPayload)
    return res.json({ authorziedAccount: true, messagesSentTrackingObj });

  if (resultOfTokenValidation.decodedPayload)
    return res.json({ isAuthorized: true, messagesSentTrackingObj });

  if (resultOfTokenValidation.invalidToken)
    return res.json({ invalidToken: true });

  // cookies().set("xAuth", token, {
  //   maxAge: 1209600000,
  //   httpOnly: true,
  //   secure: true,
  // });
});

export default isAccountAuthorizedRouter;
