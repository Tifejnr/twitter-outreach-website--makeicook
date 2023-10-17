const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

const sheets = google.sheets("v4");
const credentials = require("./credentials/credentials.json"); // Replace with the actual path to your credentials file

// Set up OAuth2 authentication
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

router.post("/", async (req, res) => {
  const { paramToDecide } = req.body;
  const { action, username, actionIdentifierObj } = paramToDecide;

  try {
    const sheetsAPI = sheets.spreadsheets.values;
    const spreadsheetId = "1btSRILeqBkknMTXjIQ8FaFT3vrV-ZPRSHSEgI65VBmI";
    const sheetName = "Sheet1";
    let columnLetter = "A"; // Specify the column letter (e.g., "A" for column A)

    //Determin column to go based on action
    if (action == actionIdentifierObj.isEmailList) {
      columnLetter = "C";
    } else if (action == actionIdentifierObj.isRepliedList) {
      columnLetter = "B";
    } else {
      columnLetter = "A";
    }

    // Find the last row with data in the specified column
    const response = await sheetsAPI.get({
      auth,
      spreadsheetId,
      range: `${sheetName}!${columnLetter}:${columnLetter}`,
    });

    const values = response.data.values;
    const lastRowIndex = values ? values.length : 0;

    // Calculate the new cell address at the bottom of the column
    const range = `${sheetName}!${columnLetter}${lastRowIndex + 1}`;

    // Append the new value to the calculated cell address
    const result = await sheetsAPI.update({
      auth,
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values: [[username]] },
    });

    if (result.status == 200) return res.status(200).json({ added: true });
  } catch (error) {
    console.error("Error appending cell value:", error);

    res.status(402).json({ error });
  }
});

module.exports = router;
