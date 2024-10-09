import express from "express";
import allVideoTutorialsArray from "../../video-tutorials/allVideoTutorialsArray.js";

const sendTutorialsObjArrayRouter = express.Router();

sendTutorialsObjArrayRouter.post("/", async (req, res) => {
  try {
    res.status(200).json({ allVideoTutorialsArray });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

export default sendTutorialsObjArrayRouter;
