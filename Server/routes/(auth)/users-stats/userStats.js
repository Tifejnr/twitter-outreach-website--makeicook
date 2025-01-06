import express from "express";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import user from "../../../server-utils/database/usersDb.js";
import updateDatesUsageArray from "./utils/updateDatesUsageArray.js";

const userStatsRouter = express.Router();

userStatsRouter.post("/", async (req, res) => {
  //get request sent
  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return res.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return res.json({ invalidToken: true });

  if (resultOfTokenValidation.decodedPayload) {
    const { decodedPayload } = resultOfTokenValidation;

    const accountUser = await user.findById(decodedPayload._id);

    if (!accountUser) return { invalidToken: true };

    //add to total no of messages from account today
    accountUser.noOfMessagesSentToday++;

    console.log(
      "aaccountUser.noOfMessagesSentToday",
      accountUser.noOfMessagesSentToday,
      accountUser.email
    );

    //check if  user has used it today to update daily stats
    const { hasItBeenUsedToday, lastFiveUsedDates } = accountUser;

    if (hasItBeenUsedToday) {
      await accountUser.save();
      return res.json({ processingDone: true });
    }

    //if user hasn't used that day, proceed to processing

    const currentDate = new Date().toISOString();

    const newUsageDatesArray = updateDatesUsageArray(
      lastFiveUsedDates,
      currentDate
    );

    accountUser.lastFiveUsedDates = newUsageDatesArray;
    accountUser.hasItBeenUsedToday = true;
    accountUser.noOfTimesUsedDailyOnly++;

    await accountUser.save();
    return res.json({ processingDone: true });
  }
});

export default userStatsRouter;
