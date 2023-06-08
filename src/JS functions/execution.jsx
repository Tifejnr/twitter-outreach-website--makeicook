export default function Execution(arrayNo, inputedMail) {
  const noOfCheckedCheckbox = document.querySelectorAll("input:checked").length;
  const email = inputedMail;

  const message = {
    email,
    boardId: idCollections[arrayNo],
  };

  async function addMember() {
    const response = await fetch(`http://localhost:3000/add`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(message),
    });

    const data = await response.json();
    if (!data.success) return;

    succes.push(1);
    const noOfSucess = succes.reduce((a, b) => a + b, 0);
    showSuccessMess(noOfCheckedCheckbox, noOfSucess);
  }
  addMember().catch((error) => {
    console.log(error);
  });
}
