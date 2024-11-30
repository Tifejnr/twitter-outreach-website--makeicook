import express from "express";
import allMakeICookTutorialsArray from "./make-i-cook-tutorials/allMakeICookTutorialsArray.js";
// import { faqArray } from "../../../Frontend/src/components/LandingPage/FAQ/AllFaqsObj.js";

const sendMakeICookTutorialsRouter = express.Router();

sendMakeICookTutorialsRouter.post("/", async (req, res) => {
  try {
    res
      .status(200)
      .json({ allVideoTutorialsArray: allMakeICookTutorialsArray });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

export default sendMakeICookTutorialsRouter;
