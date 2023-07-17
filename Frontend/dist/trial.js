const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

btn1.addEventListener("click", () => {
  console.log("yeahhaabab avv");
  async function postData() {
    const url = `https://workforreputation.com/api/auth`;
    const data = {
      name: "John Doe",
      email: "johndoe@example.com",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  postData();
});

btn2.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("yeahhaabab avv");
  async function postData() {
    const url = "https://www.collabfortrello.com/api/sign-in";
    const data = {
      namenammam: "John Doe",
      email: "johndoe@example.com",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  postData();
});
