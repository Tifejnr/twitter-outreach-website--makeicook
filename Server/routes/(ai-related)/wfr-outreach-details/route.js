import { google } from "googleapis";
import express from "express";
const sheets = google.sheets("v4");
// import credentials from "./credentials.json" assert { type: "json" }; // Replace with the actual path to your credentials file
const credentials = {
  type: "service_account",
  project_id: "outreach-sheet-details",
  private_key_id: "815c8748b3bcb3c39f4d1ef4064e8b30d0307a02",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3HeuFb6Ra+Di7\nKnXC9hVGH1QJpg63iEsb5YNIVnKaJVUNcsJ9h/6TRJQFQBHVzWoQOJBSiW+wCDLB\nSKXxVUreFEi41v60nx7VRJ+fTWO+/F6I/0oem+oDT+vzERLLmRkMld/xu5961ewa\ndQUgotqCUZnmD6wwkyWS2PY4D/vzKgNoWIla2u7Q9ef9mJyaFJ98NBl8PHlXQL0p\n3cq1IRQHQGLh2tWB7npstoGkmUFxP7wPA5gFxMIQ8clb3xAVhgnbUMml+PZOJp0G\nR/lOfC3adRVBi/zXPGnkINsaJnxPznXysPmrdB59eNbra1sa98R71nq5D3PvnEne\n+OCYM89XAgMBAAECggEAKu1ZLqVO5sKE7h+UjrlIoHEsrrxee9j4HpiNz7HwWMGC\nsE3kWTA91kE/4AE2jSQEBrxz3N16MM6jM1t4B1zC2c/wgmBoQmiA/mcBcoNebEHW\nWZBbTFSppdAhFJC+krsXu7MQ1ibxSocGu+cN5io3RlCh3uRyrcp5BvVUtyzMGCMt\n2tTDjo8U9c0Tzy+Q8392gqP2PIeQzBRuXtQ1i6KSRzHo3ICsWSeGQPbZhq5LP4SC\nCqVduU8nkoeFFgv4IQxPnc9G9o59JSbPyYDjgkmVh3MF/oJuBdJpal5+wFRF7/v5\nPm+VOYQYR2oeZ0MaOWON4VmSOkSiH+koYCs/hGe1CQKBgQDrunaK7Rxd0vGOgXLP\naRpfYXraGdOeq8qkeo8OhCh5lcZ6crYbbN7gmk/9aQJ7+BEzqr7/KL+nIt4YjmOq\nG5L95Js24tXsVk7WPbWq5lydfR0pE4oOqmYhZJ2xa74XpZ19pkA5RJJQaFafTU0J\nY0aud3IhYH07Jker2Jizb9FTyQKBgQDG3ThTeHkU9tFoyRDHbugSMksw/wTUcZqh\nbsEYMIkyYROp5DudpmNmZGHTexo7+XkoDX9iyhfLaWW0DyQhyIUeeWGaw2EYr/wn\nDmk3JphSou9fUdE7i4Q9Vm55Tsd3lMoQhyWIXw/Uzk0vfPex5VGA2CtnAP5S8CZ7\nOjY5ejZaHwKBgQCnBGwtLqaki2r+zxTrg8pdvhFvKlFX4NwpAXUOkfCjhM0lwNTq\nRY78kBkQsTBDaZW2h8nfu51e7EN0Hp7azcKuBSU8FCgB1XzyKrLmrWT9aMIacm+k\nyHKoQkPAi1gaJQubFQn4CW+pbOPC5uAoQKC5yIOixly0ZgDt7v7yU816kQKBgHuY\nqpVWXwrkjCpwLPmGuL32fD0rgrj3EoAa8fAy2lJxe2Mv8s18yHKvGQ3ziM6VsvNt\n0Cp6KGfITemnL3G/ytyx3DPwErzhQ/qSPlqEpk9V7Sh1FXHIuJvWyDqk99weoae8\nF1u2mYRN5DMLnHb4a7uEnxUZzPeHQqN7/o+ioX1JAoGAT6fp3yHM3CsB52qg2FAt\n+gLWgvEO4EJoOQYr2ws/n0n2jORsHlmJcGeL7zVe+xFNNNdBIe5miufXR2wP+cxk\n2diBVYmdAOYfPEHw9DNH6x/ekiLz8lCV0Mm+XiH8TYnaMzjtjHx9Av7bGtXbM64r\nrXC4FgOLdK0X7HdLnn05tn0=\n-----END PRIVATE KEY-----\n",
  client_email:
    "akovah-sheet-config@outreach-sheet-details.iam.gserviceaccount.com",
  client_id: "104626105116433872661",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/akovah-sheet-config%40outreach-sheet-details.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

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
    const reasonForFailure = `${homeTeamName} vs ${awayTeamName} |  ${type}, ${value} |  ${feedback}`;
    const reasonForFailureColumnLetter = "A";

    const spreadsheetId = failedTeamNamesSheetId;

    try {
      const sheetsAPI = sheets.spreadsheets.values;

      //add reason for failure  text
      const reasonForFailureSheetParams = {
        sheetsAPI,
        spreadsheetId,
        columnLetter: reasonForFailureColumnLetter,
        textToInput: reasonForFailure,
      };

      const failueReasonAddition = await addTextToASheetColumn(
        reasonForFailureSheetParams
      );

      // //add teams involved text
      // const teamsInvolvedSheetParams = {
      //   sheetsAPI,
      //   spreadsheetId,
      //   columnLetter: teamsInvolvedColumnLetter,
      //   textToInput: teamsInvolvedText,
      // };

      // const teamInvolvedAdditionResult = await addTextToASheetColumn(
      //   teamsInvolvedSheetParams
      // );

      // //add option chosen text
      // const optionChosenSheetParams = {
      //   sheetsAPI,
      //   spreadsheetId,
      //   columnLetter: optionChosenColumnLetter,
      //   textToInput: optionChosenText,
      // };

      // const optionChosenAdditionResult = await addTextToASheetColumn(
      //   optionChosenSheetParams
      // );

      if (
        // optionChosenAdditionResult.status == 200 &&
        // teamInvolvedAdditionResult.status === 200 &&
        failueReasonAddition.status === 200
      )
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
