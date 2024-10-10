import express from "express";
import allVideoTutorialsArray from "../../video-tutorials/allVideoTutorialsArray.js";
import { faqArray } from "../../../Frontend/src/components/LandingPage/FAQ/AllFaqsObj.js";

const sendTutorialsObjArrayRouter = express.Router();

sendTutorialsObjArrayRouter.post("/", async (req, res) => {
  try {
    res.status(200).json({ allVideoTutorialsArray, faqObjArray: faqArray });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

export default sendTutorialsObjArrayRouter;
