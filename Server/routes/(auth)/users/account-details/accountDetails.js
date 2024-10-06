import express from "express";
import isTokenValid from "../../../../server-utils/middleware/token-validity/isTokenValid.js";
import user from "../../../../server-utils/database/usersDb.js";

const accountDetailsRouter = express.Router();

accountDetailsRouter.post("/", async (req, res) => {
  try {
    const bodyRequest = await req.body;

    const resultOfTokenValidation = await isTokenValid(bodyRequest);

    if (resultOfTokenValidation.nullJWTToken)
      return res.json({ nullJWTToken: true });

    if (resultOfTokenValidation.invalidToken)
      return res.json({ invalidToken: true });

    if (resultOfTokenValidation.blacklistedEmail) {
      console.log("blacklistedEmail", resultOfTokenValidation.blacklistedEmail);
      return res.json({
        clientNameResponse: "Hadhri",
      });
    }

    const { decodedPayload } = resultOfTokenValidation;

    const accountUser = await user.findById(decodedPayload._id);

    if (!accountUser) return { invalidToken: true };
    return res.json({
      accountDetails: accountUser,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default accountDetailsRouter;
