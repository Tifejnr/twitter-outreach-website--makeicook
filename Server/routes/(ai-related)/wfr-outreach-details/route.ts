import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
const sheets = google.sheets("v4");
import credentials from "./credentials.json"; // Replace with the actual path to your credentials file
import isTokenValid from "../../../middlewares/jwt-related/isTokenValid";

const wfrToolKitInstagramSpreadsheetId =
  "13MvuAWr76SPmvJ9mPu5OgRW8GeyDe9SHZyaqQTS9kTU";
const wfrToolKitTwitterSpreadsheetId =
  "1XUJxi2EPmq17kZgKW6A3elhpFqQWB_HHT_MEW5WGAGk";

// Set up OAuth2 authentication
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return Response.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return Response.json({ invalidToken: true });

  const { paramToDecide } = bodyRequest;

  const {
    action,
    username,
    actionIdentifierObj,
    fromTwitterInbox,
    fromTwitterCommentReply,
  } = paramToDecide;

  let spreadsheetId;

  try {
    const sheetsAPI = sheets.spreadsheets.values;
    if (fromTwitterInbox || fromTwitterCommentReply) {
      spreadsheetId = wfrToolKitTwitterSpreadsheetId;
    } else {
      spreadsheetId = wfrToolKitInstagramSpreadsheetId;
    }

    const sheetName = "Sheet1";
    let columnLetter = "A"; // Specify the column letter (e.g., "A" for column A)

    //Determin column to go based on action
    if (action == actionIdentifierObj.isEmailList) {
      columnLetter = "C";
    } else if (action == actionIdentifierObj.isRepliedList) {
      columnLetter = fromTwitterCommentReply ? "D" : "B";
    } else {
      columnLetter = fromTwitterCommentReply ? "C" : "A";
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
    // Append the new value to the calculated cell address
    const result = await sheetsAPI.update({
      auth,
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: [[username]] }, // Use requestBody instead of resource
    });

    if (result.status == 200) return Response.json({ added: true });
  } catch (error) {
    console.error("Error appending cell value:", error);

    Response.json({ error });
  }
}
