import express from "express";
import coookieParser from "cookie-parser";
import isTokenValidMakeICook from "../token-validity/isTokenValidMakeICook.js";

const isAccountAuthorizedMakeICookRouter = express.Router();

isAccountAuthorizedMakeICookRouter.use(coookieParser());

isAccountAuthorizedMakeICookRouter.post("/", async (req, res) => {
  //get request sent
  const bodyRequest = await req.body;
  const { token } = bodyRequest;

  const resultOfTokenValidation = await isTokenValidMakeICook(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return res.json({ nullJWTToken: true });

  if (resultOfTokenValidation.decodedPayload)
    return res
      .cookie("authToken", token, { maxAge: 100000, httpOnly: true })
      .json({ authorziedAccount: true });

  if (resultOfTokenValidation.decodedPayload)
    return res
      .cookie("authToken", token, { maxAge: 100000, httpOnly: true })
      .json({ isAuthorized: true });

  if (resultOfTokenValidation.invalidToken)
    return res.json({ invalidToken: true });

  if (resultOfTokenValidation.authorizedOnJSSHomePage)
    return res.json({ authorizedOnJSSHomePage: true });

  if (resultOfTokenValidation.notAuthorizedOnJSSHomePage)
    return res.json({ notAuthorizedOnJSSHomePage: true });

  // cookies().set("xAuth", token, {
  //   maxAge: 1209600000,
  //   httpOnly: true,
  //   secure: true,
  // });
});

export default isAccountAuthorizedMakeICookRouter;
