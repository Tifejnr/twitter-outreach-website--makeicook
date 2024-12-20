// import express from "express";
// import { HfInference } from "@huggingface/inference";

// import getSecretKeys from "../../../envVariables/envVariables.js";
// import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

// import splitTextIntoThreeParts from "./utils/splitTextsIntoThreeEqualParts.js";
// import processClientNameGotten from "./utils/processClientNameGotten.js";
// import getTotalWordsLength from "./utils/getTotalWordsLength.js";

// const keysObject = getSecretKeys();
// const model = keysObject.huggingFaceModel;
// const HF_TOKEN = keysObject.HF_TOKEN;
// const hf = new HfInference(HF_TOKEN);

// const getClientNamePromptHeading = `What first one word is a real human name?`;

// const getClientNameRouter = express.Router();

// getClientNameRouter.post("/", async (req, res) => {
//   const bodyRequest = await req.body;

//   const resultOfTokenValidation = await isTokenValid(bodyRequest);

//   if (resultOfTokenValidation.nullJWTToken)
//     return res.json({ nullJWTToken: true });

//   if (resultOfTokenValidation.invalidToken)
//     return res.json({ invalidToken: true });

//   if (resultOfTokenValidation.blacklistedEmail) {
//     console.log("blacklistedEmail", resultOfTokenValidation.blacklistedEmail);
//     return res.json({
//       clientNameResponse: "Hadhri",
//     });
//   }

//   const { prompt } = bodyRequest;

//   const { part1, part2, part3 } = splitTextIntoThreeParts(prompt);

//   const wordsLengthTotal = getTotalWordsLength(prompt);

//   // console.log("wordsLengthTotal", wordsLengthTotal);

//   try {
//     //if it's a short prompt
//     if (wordsLengthTotal < 100) {
//       let clientNameResponseRaw = await getResponseFromAi(prompt);

//       const cleanedClientName = processClientNameGotten(clientNameResponseRaw);
//       const cleanedNameLength = getTotalWordsLength(cleanedClientName);

//       console.log(
//         "less than 100 words",
//         clientNameResponseRaw,
//         cleanedClientName
//       );

//       if (cleanedNameLength > 4) {
//         const clientNameResponseRaw = await getResponseFromAi(
//           cleanedClientName
//         );

//         const secondCleanedClientName = processClientNameGotten(
//           clientNameResponseRaw
//         );

//         return res.json({ clientNameResponse: secondCleanedClientName });
//       } else {
//         return res.json({ clientNameResponse: cleanedClientName });
//       }
//     }

//     //fist part getting client name
//     let firstClientNameResponseRaw = await getResponseFromAi(part1);

//     let firstCleanedClientName = processClientNameGotten(
//       firstClientNameResponseRaw
//     );

//     console.log(
//       "first part cleaned",
//       firstClientNameResponseRaw,
//       firstCleanedClientName
//     );

//     if (
//       firstCleanedClientName !== "Hi there" &&
//       firstClientNameResponseRaw !== "." &&
//       !firstClientNameResponseRaw.includes("ignore") &&
//       firstCleanedClientName !== "client name is greater than 4"
//     )
//       return res.json({ clientNameResponse: firstCleanedClientName });

//     if (firstCleanedClientName == "client name is greater than 4") {
//       firstClientNameResponseRaw = await getResponseFromAi(
//         firstCleanedClientName
//       );
//       firstCleanedClientName = processClientNameGotten(
//         firstClientNameResponseRaw
//       );
//     }

//     if (
//       firstCleanedClientName !== "Hi there" &&
//       firstClientNameResponseRaw !== "." &&
//       firstCleanedClientName !== "client name is greater than 4"
//     )
//       return res.json({ clientNameResponse: firstCleanedClientName });

//     //move to part two texts

//     let secondClientNameResponseRaw = await getResponseFromAi(part2);

//     let secondCleanedClientName = processClientNameGotten(
//       secondClientNameResponseRaw
//     );

//     console.log(
//       "second part cleaned",
//       secondClientNameResponseRaw,
//       secondCleanedClientName
//     );

//     if (
//       secondCleanedClientName !== "Hi there" &&
//       secondClientNameResponseRaw !== "." &&
//       secondCleanedClientName !== "client name is greater than 4"
//     )
//       return res.json({ clientNameResponse: secondCleanedClientName });

//     if (secondCleanedClientName == "client name is greater than 4") {
//       secondClientNameResponseRaw = await getResponseFromAi(
//         secondCleanedClientName
//       );
//       secondCleanedClientName = processClientNameGotten(
//         secondClientNameResponseRaw
//       );
//     }

//     if (
//       secondCleanedClientName !== "Hi there" &&
//       secondClientNameResponseRaw !== "." &&
//       secondCleanedClientName !== "client name is greater than 4"
//     )
//       return res.json({ clientNameResponse: secondCleanedClientName });

//     //third part text

//     let thirdClientNameResponseRaw = await getResponseFromAi(part3);

//     let thirdCleanedClientName = processClientNameGotten(
//       thirdClientNameResponseRaw
//     );

//     console.log(
//       "third part cleaned",
//       thirdClientNameResponseRaw,
//       thirdCleanedClientName
//     );

//     if (
//       thirdCleanedClientName !== "Hi there" &&
//       thirdClientNameResponseRaw !== "." &&
//       thirdCleanedClientName !== "client name is greater than 4"
//     )
//       return res.json({ clientNameResponse: thirdCleanedClientName });

//     if (thirdCleanedClientName == "client name is greater than 4") {
//       thirdClientNameResponseRaw = await getResponseFromAi(
//         thirdCleanedClientName
//       );
//       thirdCleanedClientName = processClientNameGotten(
//         thirdClientNameResponseRaw
//       );
//     }

//     if (
//       thirdCleanedClientName !== "Hi there" &&
//       thirdClientNameResponseRaw !== "." &&
//       thirdCleanedClientName !== "client name is greater than 4"
//     )
//       return res.json({ clientNameResponse: thirdCleanedClientName });

//     //return final shit still
//     return res.json({ clientNameResponse: thirdCleanedClientName });
//   } catch (error) {
//     console.log("error,", error);

//     return res.json({ error: "Internal server error" });
//   }
// });

// // async function getResponseFromAi(prompt) {
// //   const result = await hf.questionAnswering({
// //     model: model,
// //     inputs: {
// //       //instruction for what to extract
// //       question: getClientNamePromptHeading,
// //       //freelancers feedback
// //       context: prompt,
// //     },
// //   });

// //   return result.answer;
// // }

// async function getResponseFromAi(prompt) {
//   let fullResponse = ""; // Initialize an empty string to store the full response

//   for await (const chunk of hf.chatCompletionStream({
//     model: "meta-llama/Meta-Llama-3-8B-Instruct",
//     messages: [
//       {
//         role: "user",
//         content: `
//    Return only all the human names in the texts below, only return the human names, don't prefix your response with text at all.

//    if there are multiple names, seperate them using comma.

//    If there are no human names, return "Hi there".

//    ${prompt}
// `,
//       },
//     ],
//     max_tokens: 500,
//   })) {
//     const response = chunk.choices[0]?.delta?.content;
//     if (response) {
//       fullResponse += response; // Concatenate each chunk to the full response
//     }
//   }

//   console.log("Final response:", fullResponse); // Log the full response
//   return fullResponse; // Return the full response
// }

// export default getClientNameRouter;
