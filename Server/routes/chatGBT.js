const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const { map } = require("lodash");
const Joi = require("joi");
const router = express.Router();
const { getSecretKeys } = require("/root/Wfr-Digital-Ocean/envVariables");
const keysObject = getSecretKeys();

const token = keysObject.BLESSING_OPENAI_APIK_KEY;

const configuration = new Configuration({
  apiKey: token,
});

const openai = new OpenAIApi(configuration);

function validate(req) {
  const schema = Joi.object({
    prompt: Joi.string().min(3).max(20050).required(),
    temperature: Joi.number().positive().min(0).max(1).required(),
    maxToken: Joi.number().positive().integer().min(100).max(30000).required(),
  });

  return schema.validate(req);
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return (
      res.status(400).json({ emailError: error.details[0].message }),
      console.log(error.details[0].message)
    );
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: req.body.temperature,
      max_tokens: req.body.maxToken,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 1,
    });

    res.status(200).send({ bot: completion.data.choices[0].text });
  } catch (error) {
    console.log(error);
    console.log(error.response.statusText);
    const errorMessage = error.response.statusText;
    return res.status(401).json({ errorMessage: errorMessage });
  }
});

module.exports = router;
