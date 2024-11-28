import express from "express";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";

const getClientPainPointRouter = express.Router();

const describeClientPainPoints = `
Highlight briefly the client pain point from this job decsription that you feel will most likely grab the client's attention if addressed when applying to this job.

describe all the client pain points from this job description in bullet points.

Only return the response straight forward. don't prefix your response with any brief.
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

  const temperature = 0.7;
  const maxTokens = 1000;

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

`Do clients rarely view your proposals? WFR Toolkit will help you out. 

On Upwork, Do you know that only the first 250 characters of your cover letter are first shown to the client?

Alright, so your first 250 characters highly determine whether the client will view the rest of your proposal.

This means the first 250 characters of your cover letter must always grab the client's attention right away to increase your chances of getting hired.

WFR Toolkit extension tells you which of the pain points from the job description to address to get the client's attention within the first 250 characters of your cover letter.

Or better still.

WFR Toolkit extension help you generate  attention-grabbing hook-up line for your cover letter.

like this: 


Ready to increase the chances of clients viewing your proposals and getting hired on Upwork ? 


Join over 200 Upwork freelancers already using WFR Toolkit today. 

WFR Toolkit works with both Light Mode and Dark Mode themes.

Install WFR Toolkit now.
`;
