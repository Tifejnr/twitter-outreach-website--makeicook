// import puppeteer from "puppeteer";

// async function checkInterviewingInList() {
//   let shouldOpenBrowser = true; // Set to true to open browser initially

//   while (true) {
//     if (shouldOpenBrowser) {
//       const browser = await puppeteer.launch({ headless: false });
//       const page = await browser.newPage();

//       await page.goto(
//         "https://www.upwork.com/jobs/~01cf73a896e0e369fb?referrer_url_path=%2Fnx%2Fsearch%2Fjobs%2Fdetails%2F~01cf73a896e0e369fb"
//       ); // Replace 'https://www.upwork.com/jobs/~015b923ee830a6353f' with your target URL

//       shouldOpenBrowser = false; // Set to false after opening browser initially
//     } else {
//       // Use an existing browser instance
//       const browser = await puppeteer.connect({
//         browserURL: "http://localhost:9222/json",
//       }); // Connect to an existing browser
//       const pages = await browser.pages();
//       const page = pages[0]; // Use the first page

//       // Navigate to the URL if needed
//       const url = await page.url();

//       if (
//         url !==
//         "https://www.upwork.com/jobs/~01cf73a896e0e369fb?referrer_url_path=%2Fnx%2Fsearch%2Fjobs%2Fdetails%2F~01cf73a896e0e369fb"
//       ) {
//         await page.goto(
//           "https://www.upwork.com/jobs/~01cf73a896e0e369fb?referrer_url_path=%2Fnx%2Fsearch%2Fjobs%2Fdetails%2F~01cf73a896e0e369fb"
//         ); // Replace 'https://example.com' with your target URL
//       }
//     }

//     // Wait for the list items to be available
//     await page.waitForSelector(".ca-item");

//     // Extract the text content of all list items
//     const listItemsText = await page.evaluate(() => {
//       const listItems = document.querySelectorAll(".ca-item");
//       return Array.from(listItems).map((li) => li.textContent.trim());
//     });

//     // Check if any list item contains the word "Interviewing"
//     if (listItemsText.some((item) => item.includes("Interviewing"))) {
//       console.log('Found "Interviewing" in one of the list items!');
//       break; // Exit loop if condition is met
//     } else {
//       console.log('No list item contains the word "Interviewing".');
//     }

//     // Wait for 5 seconds before checking again
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//   }

//   await browser.close();
// }

// checkInterviewingInList();
