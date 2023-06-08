import progressBarMove from "./progressBar/MoveProgressBar";

const progressBarTitle = document.getElementById("progressBarTitle");
const successStatusTitle = document.getElementById("successStatusTitle");
const mainContentCont = document.getElementById("mainContentCont");
const BAR = document.getElementById("bar");
const progressBarContainer = document.getElementById("loading");
const allForms = document.getElementsByTagName("form");
const startingTitle = "Loading Your Boards...";

// console
let dataLength;
let lenghtID;
let idCollections = [];
let fetchedData;
let realLenght;


function hide(ele) {
  ele.style.display = "none";
}


export default function FetchData() {

  async function adds() {
    const url = "http://localhost:3000/start";
    const dataSent = { send: true };

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

      // Append the checkbox and label elements to the form
      form.appendChild(checkbox);
      form.appendChild(label);

      // Append the form to the document body or any desired container
      document.body.appendChild(form);

      const boardId = board.id;
      idCollections.push(boardId);

      fetchedData.push(1);
      const fetchedDataSum = fetchedData.reduce((a, b) => a + b, 0);
      progressBarMove(fetchedDataSum, lenghtID);
    });
  }

  adds().catch((error) => {
    console.log(error);
  });
}


