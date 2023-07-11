import progressBarMove from "./progressBar/MoveProgressBar";
import { hide } from "./Utilis/EleDisplay";
import getCookie from "./Auth/cookie-handling/get-cookie";
let dataLength;
let lenghtID;
let idCollections = [];
let fetchedData;

const websiteUrl = "http://localhost:3000";

export default async function FetchData(needOnlyBoardCollections) {
  progressBarMove(3, 100);

  try {
    const jwtToken = await getCookie();
    const url = `${websiteUrl}/start`;
    const dataSent = { jwtToken };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSent),
    });

    const dataRaw = await response.json();

    if (dataRaw.error) {
      if (dataRaw.error.code === "ENOTFOUND")
        return console.log("No internet network");
    }

    const data = dataRaw.boards;

    console.log(data);

    if (needOnlyBoardCollections) return data;

    dataLength = data.length;
    lenghtID = data.length - 1;
    fetchedData = [];

    data.map((board, index) => {
      // Create the form element
      const form = document.createElement("form");
      form.className = "item";
      form.name = "main";
      hide(form);

      // Create the checkbox element
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "fruit";
      checkbox.className = "inputs";
      checkbox.id = `check${index}`;

      // Create the label element
      const label = document.createElement("label");
      label.htmlFor = `check${index}`;
      label.id = `labelcheck${index}`;
      label.innerHTML = board.name;

      //Create article Element
      const article = document.createElement("article");
      article.className = "label-article";

      // Append the checkbox and label elements to the form
      article.appendChild(checkbox);
      article.appendChild(label);
      //Append artcile to form
      form.appendChild(article);

      // Append the form to the document body or any desired container
      const innerMainContentCont = document.getElementById(
        "innerMainContentCont"
      );
      innerMainContentCont.appendChild(form);

      const boardId = board.id;
      idCollections.push(boardId);

      fetchedData.push(1);
      const fetchedDataSum = fetchedData.reduce((a, b) => a + b, 0);
      progressBarMove(fetchedDataSum, lenghtID);
    });
  } catch (error) {
    console.log(error);
  }
}
