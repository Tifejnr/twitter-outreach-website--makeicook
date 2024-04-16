import { google } from "googleapis";
import express from "express";
const sheets = google.sheets("v4");
import credentials from "./credentials.json" assert { type: "json" }; // Replace with the actual path to your credentials file
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

// Set up OAuth2 authentication
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const wfrOutreachRecordingRouter = express.Router();

wfrOutreachRecordingRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  // const resultOfTokenValidation = await isTokenValid(bodyRequest);

  // if (resultOfTokenValidation.nullJWTToken)
  //   return res.json({ nullJWTToken: true });

  // if (resultOfTokenValidation.invalidToken)
  //   return res.json({ invalidToken: true });

  const { paramToDecide, paramsToAddToSheet } = bodyRequest;

  // for adding usernames to sheet

  if (paramToDecide) {
    console.log("paramToDecide", paramToDecide);
    const { username, columnLetter, spreadsheetId } = paramToDecide;
    try {
      const sheetsAPI = sheets.spreadsheets.values;

      const sheetName = "Sheet1";

      // Find the last row with data in the specified column
      const resultResponse = await sheetsAPI.get({
        auth,
        spreadsheetId,
        range: `${sheetName}!${columnLetter}:${columnLetter}`,
      });

      const values = resultResponse.data.values;
      const lastRowIndex = values ? values.length : 0;

      // Calculate the new cell address at the bottom of the column
      const range = `${sheetName}!${columnLetter}${lastRowIndex + 1}`;

      // Append the new value to the calculated cell address
      // Append the new value to the calculated cell address
      const result = await sheetsAPI.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values: [[username]] }, // Use requestBody instead of resource
      });

      if (result.status == 200) return res.json({ added: true });
    } catch (error) {
      console.error("Error appending cell value:", error);

      res.json({ error });
    }
  }

  if (paramsToAddToSheet) {
    const {
      teamName,
      sportyTeamName,
      spreadsheetId,
      rawTeamNamecolumnLetter,
      sportyTeamNamecolumnLetter,
    } = paramsToAddToSheet;

    try {
      const sheetsAPI = sheets.spreadsheets.values;

      const sheetName = "Sheet1";

      // Find the last row with data in the with raw team name column letter
      const rawTeamAddedresultResponse = await sheetsAPI.get({
        auth,
        spreadsheetId,
        range: `${sheetName}!${rawTeamNamecolumnLetter}:${rawTeamNamecolumnLetter}`,
      });

      const values = rawTeamAddedresultResponse.data.values;
      const lastRowIndex = values ? values.length : 0;

      // Calculate the new cell address at the bottom of the column
      const range = `${sheetName}!${rawTeamNamecolumnLetter}${
        lastRowIndex + 1
      }`;

      // Append the new value to the calculated cell address
      const rawTeamAddedresult = await sheetsAPI.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values: [[teamName]] }, // Use requestBody instead of resource
      });

      // Find the last row with data in the with sporty team name column letter
      const sportyTeamAddedresultResponse = await sheetsAPI.get({
        auth,
        spreadsheetId,
        range: `${sheetName}!${sportyTeamNamecolumnLetter}:${sportyTeamNamecolumnLetter}`,
      });

      const valuesSporty = sportyTeamAddedresultResponse.data.values;
      const lastRowIndexSporty = valuesSporty ? valuesSporty.length : 0;

      // Calculate the new cell address at the bottom of the column
      const rangeSporty = `${sheetName}!${sportyTeamNamecolumnLetter}${
        lastRowIndexSporty + 1
      }`;

      // Append the new value to the calculated cell address
      const sportyTeamAddedresult = await sheetsAPI.update({
        auth,
        spreadsheetId,
        range: rangeSporty,
        valueInputOption: "RAW",
        requestBody: { values: [[sportyTeamName]] }, // Use requestBody instead of resource
      });

      if (
        rawTeamAddedresult.status == 200 &&
        sportyTeamAddedresult.status === 200
      )
        return res.json({ added: true });
    } catch (error) {
      console.error("Error appending cell value:", error);

      res.json({ error });
    }
  }
});

export default wfrOutreachRecordingRouter;
