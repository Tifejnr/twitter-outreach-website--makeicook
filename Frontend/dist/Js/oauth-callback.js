const callbackUrl = "http://localhost:3000/authorization-callback";
// const callbackUrl = "http://localhost:3000/authorization-callback";

//get cookie to be sent to server
function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  return cookie ? cookie.split("=")[1] : null;
}

// Usage:

// if (cftAuthValue !== null) {
//   console.log("cftAuth cookie value:", cftAuthValue);
// } else {
//   console.log("cftAuth cookie not found");
// }

// (async () => {
//   const token = getCookie("cftAuth");
//   const data = {
//     token,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log("Response data:", responseData);

//     const redirectUrl = responseData.redirectUrl;

//     if (redirectUrl) return (window.location.href = "/home");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
