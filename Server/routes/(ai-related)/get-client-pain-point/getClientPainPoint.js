import express from "express";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";

const getClientPainPointRouter = express.Router();

const describeClientPainPoints = `
describe all the client pain points from this job description ranked in order of importance.


Only return the response. don't explain anything, don't prefix your response with anything.
`;

getClientPainPointRouter.post("/", async (req, res) => {
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

  const { jobDescription } = bodyRequest;
  const { credits } = resultOfTokenValidation;
  if (credits === 0) {
    return res.json({
      buyCredits: true,
    });
  }

  const temperature = 0.8;
  const maxTokens = 1500;

  try {
    //get client pain points from description
    const clientPainPoints = await getStraightAiResponse(
      describeClientPainPoints,
      jobDescription,
      temperature,
      maxTokens
    );

    return res.json({ clientPainPoints });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default getClientPainPointRouter;
