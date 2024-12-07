import express from "express";
import user from "../../server-utils/database/usersDb.js";
import isTokenValid from "../../server-utils/middleware/token-validity/isTokenValid.js";

const saveUserDetailsRouter = express.Router();

saveUserDetailsRouter.post("/", async (req, res) => {
  try {
    const bodyRequest = await req.body;

    console.log(" bodyRequest", bodyRequest);

    const { paramToServer } = bodyRequest;
    const { aiChattingConfigArray, sheetObjArray, replyTemplateArray } =
      paramToServer;

    const resultOfTokenValidation = await isTokenValid(bodyRequest);

    if (!resultOfTokenValidation.decodedPayload) {
      return res.status(401).json({ invalidToken: true });
    }

    const { decodedPayload } = resultOfTokenValidation;
    const accountUser = await user.findById(decodedPayload._id);

    if (!accountUser) return res.status(401).json({ invalidUser: true });

    if (aiChattingConfigArray) {
      accountUser.aiChattingConfigArray = aiChattingConfigArray;
    }

    if (sheetObjArray) {
      accountUser.sheetObjArray = sheetObjArray;
    }

    if (replyTemplateArray) {
      accountUser.replyTemplateArray = replyTemplateArray;
    }

    await accountUser.save();

    return res.json({ success: true, message: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to save data" });
  }
});

saveUserDetailsRouter.post("/get", async (req, res) => {
  try {
    const bodyRequest = await req.body;

    const resultOfTokenValidation = await isTokenValid(bodyRequest);

    if (!resultOfTokenValidation.decodedPayload) {
      return res.status(401).json({ invalidToken: true });
    }

    const { decodedPayload } = resultOfTokenValidation;
    const accountUser = await user.findById(decodedPayload._id);

    if (!accountUser) return res.status(401).json({ invalidUser: true });

    const { aiChattingConfigArray, sheetObjArray, replyTemplateArray } =
      accountUser;

    return res.json({
      success: true,
      aiChattingConfigArray,
      sheetObjArray,
      replyTemplateArray,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to save data" });
  }
});

export default saveUserDetailsRouter;
