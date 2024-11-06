//function to fetch google list from google sheetsexpo
export default async function fetchDataFromSheet(sheetLink, sheetIndex) {
  try {
    // Fetch data from the Google Sheets API
    const response = await fetch(sheetLink);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Extract the response text
    const responseText = await response.text();

    // Extract the JSON data from the response text
    const jsonStartIndex = responseText.indexOf("{");
    const jsonEndIndex = responseText.lastIndexOf("}") + 1;
    const jsonData = JSON.parse(
      responseText.slice(jsonStartIndex, jsonEndIndex)
    );

    // Now you can work with the jsonData object
    const fileteredNames = jsonData.table.rows.map((element) => {
      const eleArray = element.c;

      const namesArray = eleArray.map((data, index) => {
        if (index != sheetIndex || data === null) return;
        return data.v;
      });

      const filteredArray = namesArray.filter((item) => item !== undefined);

      return filteredArray;
    });

    return fileteredNames;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
