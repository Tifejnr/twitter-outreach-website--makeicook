import { google } from "googleapis";
import express from "express";
const sheets = google.sheets("v4");
import credentials from "./credentials.json" assert { type: "json" }; // Replace with the actual path to your credentials file

// Set up OAuth2 authentication
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheetIDooooMFCTeamNames = "1EXygvrShW-XgrGGwneXcHVw3Pksd137WmXH9Ofe_yxw";

const failedTeamNamesSheetId = "1lJzDe86aD-wKgDZ69ru6F_KVVpn7BD_ltKI10NbBI4E";

const wfrOutreachRecordingRouter = express.Router();

wfrOutreachRecordingRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  // const resultOfTokenValidation = await isTokenValid(bodyRequest);

  // if (resultOfTokenValidation.nullJWTToken)
  //   return res.json({ nullJWTToken: true });

  // if (resultOfTokenValidation.invalidToken)
  //   return res.json({ invalidToken: true });

  const {
    paramToDecide,
    paramsToAddToSheet,
    paramToAddFailedSimulationReason,
  } = bodyRequest;

  // for adding usernames to sheet

  if (paramToDecide) {
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
      rawTeamNamecolumnLetter,
      sportyTeamNamecolumnLetter,
    } = paramsToAddToSheet;

    const spreadsheetId = sheetIDooooMFCTeamNames;

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

  //failed simulation reasons
  if (paramToAddFailedSimulationReason) {
    const { homeTeamName, awayTeamName, type, value, feedback } =
      paramToAddFailedSimulationReason;

    const teamsInvolvedText = `${homeTeamName} vs ${awayTeamName}`;
    const teamsInvolvedColumnLetter = "A";
    const optionChosenText = `${type}- ${value}`;
    const optionChosenColumnLetter = "B";
    const reasonForFailure = feedback;
    const reasonForFailureColumnLetter = "C";

    const spreadsheetId = failedTeamNamesSheetId;

    try {
      const sheetsAPI = sheets.spreadsheets.values;

      //add teams involved text
      const teamsInvolvedSheetParams = {
        sheetsAPI,
        spreadsheetId,
        columnLetter: teamsInvolvedColumnLetter,
        textToInput: teamsInvolvedText,
      };

      await addTextToASheetColumn(teamsInvolvedSheetParams);

      //add option chosen text
      const optionChosenSheetParams = {
        sheetsAPI,
        spreadsheetId,
        columnLetter: optionChosenColumnLetter,
        textToInput: optionChosenText,
      };

      await addTextToASheetColumn(optionChosenSheetParams);

      //add reason for failure  text
      const reasonForFailureSheetParams = {
        sheetsAPI,
        spreadsheetId,
        columnLetter: reasonForFailureColumnLetter,
        textToInput: reasonForFailure,
      };

      await addTextToASheetColumn(reasonForFailureSheetParams);

      // if (
      //   rawTeamAddedresult.status == 200 &&
      //   sportyTeamAddedresult.status === 200
      // )
      return res.json({ added: true });
    } catch (error) {
      console.error("Error appending cell value:", error);

      res.json({ error });
    }
  }
});

async function addTextToASheetColumn(params) {
  const { sheetsAPI, columnLetter, textToInput, spreadsheetId } = params;
  const sheetName = "Sheet1";

  // Find the last row with data in the with raw team name column letter
  const additionProcessResponse = await sheetsAPI.get({
    auth,
    spreadsheetId,
    range: `${sheetName}!${columnLetter}:${columnLetter}`,
  });

  const values = additionProcessResponse.data.values;
  const lastRowIndex = values ? values.length : 0;

  // Calculate the new cell address at the bottom of the column
  const range = `${sheetName}!${columnLetter}${lastRowIndex + 1}`;

  // Append the new value to the calculated cell address
  const isAddedresult = await sheetsAPI.update({
    auth,
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [[textToInput]] }, // Use requestBody instead of resource
  });

  return isAddedresult;
}

export default wfrOutreachRecordingRouter;
