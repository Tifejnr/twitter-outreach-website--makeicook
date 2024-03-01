import express from "express";
const router = express.Router();
const { HfInference } = require("@huggingface/inference");
const { getKeys } = require("../../../envKeys/allKeys");
const keysObj = getKeys();
const HF_TOKEN = keysObj.HF_TOKEN;

// const model = "rsvp-ai/bertserini-bert-base-squad";
const model = keysObj.huggingFaceModel;
const hf = new HfInference(HF_TOKEN);

const getClientNamePromptHeading = `What one word is a real human name?`;

//workspaces routes
router.post("/", async (req, res) => {
  //   if (error)
  //     return (
  //       res.status(400).json({ emailError: error.details[0].message }),
  //       console.log(error.details[0].message)
  //     )
  const { prompt } = req.body;
  try {
    const result = await hf.questionAnswering({
      model: model,
      inputs: {
        //instruction for what to extract
        question: getClientNamePromptHeading,
        //freelancers feedback
        context: prompt,
      },
    });

    const clientNameResponse = result.answer;

    // console.log("result", result);
    console.log("result", result.answer);

    return res.json({ clientNameResponse });
  } catch (error) {
    console.log("error,", error);
    // const errorMessage = error.response.statusText
    // return res.status(401).json({ errorMessage: errorMessage })
  }
});

module.exports = router;
