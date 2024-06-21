import { google } from "googleapis";
import express from "express";
import credentials from "./credentials.json" assert { type: "json" };

const sheets = google.sheets("v4");

// Set up OAuth2 authentication
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const wfrOutreachRecordingRouter = express.Router();

wfrOutreachRecordingRouter.post("/", async (req, res) => {
  const bodyRequest = req.body;

  try {
    const authClient = await auth.getClient();
    const token = await authClient.getAccessToken();
    console.log("Generated Access Token:", token);

    const { paramToDecide, paramsToAddToSheet } = bodyRequest;

    if (paramToDecide) {
      const { username, columnLetter, spreadsheetId } = paramToDecide;
      try {
        const sheetsAPI = sheets.spreadsheets.values;
        const sheetName = "Sheet1";

        const resultResponse = await sheetsAPI.get({
          auth,
          spreadsheetId,
          range: `${sheetName}!${columnLetter}:${columnLetter}`,
        });

        const values = resultResponse.data.values;
        const lastRowIndex = values ? values.length : 0;
        const range = `${sheetName}!${columnLetter}${lastRowIndex + 1}`;

        const result = await sheetsAPI.update({
          auth,
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          requestBody: { values: [[username]] },
        });

        if (result.status == 200) return res.json({ added: true });
      } catch (error) {
        console.error("Error appending cell value:", error);
        return res.json({ error: error.message });
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

        const rawTeamAddedresultResponse = await sheetsAPI.get({
          auth,
          spreadsheetId,
          range: `${sheetName}!${rawTeamNamecolumnLetter}:${rawTeamNamecolumnLetter}`,
        });

        const values = rawTeamAddedresultResponse.data.values;
        const lastRowIndex = values ? values.length : 0;
        const range = `${sheetName}!${rawTeamNamecolumnLetter}${
          lastRowIndex + 1
        }`;

        const rawTeamAddedresult = await sheetsAPI.update({
          auth,
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          requestBody: { values: [[teamName]] },
        });

        const sportyTeamAddedresultResponse = await sheetsAPI.get({
          auth,
          spreadsheetId,
          range: `${sheetName}!${sportyTeamNamecolumnLetter}:${sportyTeamNamecolumnLetter}`,
        });

        const valuesSporty = sportyTeamAddedresultResponse.data.values;
        const lastRowIndexSporty = valuesSporty ? valuesSporty.length : 0;
        const rangeSporty = `${sheetName}!${sportyTeamNamecolumnLetter}${
          lastRowIndexSporty + 1
        }`;

        const sportyTeamAddedresult = await sheetsAPI.update({
          auth,
          spreadsheetId,
          range: rangeSporty,
          valueInputOption: "RAW",
          requestBody: { values: [[sportyTeamName]] },
        });

        if (
          rawTeamAddedresult.status == 200 &&
          sportyTeamAddedresult.status === 200
        )
          return res.json({ added: true });
      } catch (error) {
        console.error("Error appending cell value:", error);
        return res.json({ error: error.message });
      }
    }
  } catch (error) {
    console.error("Error obtaining auth client or access token:", error);
    return res.json({ error: error.message });
  }
});

export default wfrOutreachRecordingRouter;
