// import React, { useState, useEffect, useContext } from "react";
// import { websiteUrl } from "../../JS functions/websiteUrl";
// import useStore from "../Hooks/Zustand/usersStore";
// import ProgressBar from "./ProgressBar";
// let succes,
//   failuresArray,
//   totalAttemptedArray,
//   userDetailsLength,
//   totalDurationLength,
//   userDetailNow,
//   failuresArrayLength,
//   successLength,
//   totalAttemptedArrayLength,
//   barWidth,
//   totalAttemptedLength,
//   userDetail;
// const action = "Addition";
// const actionTitle = "Adding";
// const section = "boards";
// const pageName = "add-member";
// export default function ProgressExceution(props) {
//   // const [userDetail, setUserDetail] = useState("");
//   // const [failuresLength, setFailuresLength] = useState(0);
//   // const [sucessLength, setSucessLength] = useState(0);
//   // const [totalAttemptedLength, setTotalAttemptedLength] = useState(0);
//   // const [barWidth, setBarWidth] = useState(0);
//   //props collections
//   const emailInputs = props.executionParams.textAreaValue;
//   const executionObjs = props.executionParams.executionObjs;
//   const checkedCheckboxesLength = props.executionParams.checkedCheckboxesLength;
//   const settingProgress = (showProgressToUserObj) => {
//     userDetailNow = showProgressToUserObj.userDetail;
//     successLength = showProgressToUserObj.successLength;
//     failuresArrayLength = showProgressToUserObj.failuresArrayLength;
//     totalAttemptedArrayLength = showProgressToUserObj.totalAttemptedArrayLength;
//     // setFailuresLength(failuresArrayLength);
//     // setSucessLength(successLength);
//     // setUserDetail(userDetailNow);
//     // setTotalAttemptedLength(totalAttemptedArrayLength);
//     barWidth =
//       (Number(totalAttemptedArrayLength) / Number(totalDurationLength)) * 100;
//     console.log(
//       totalAttemptedArrayLength,
//       totalDurationLength,
//       successLength,
//       barWidth
//     );
//     // setBarWidth(percentLoaded)
//   };
//   const emailListSplited = emailInputs.split(",");
//   userDetailsLength = Number(emailListSplited.length);
//   console.log(emailListSplited);
//   totalDurationLength = Number(checkedCheckboxesLength) * userDetailsLength;
//   //Loop through all email and add them to all the boards
//   emailListSplited.map((eachEmail, index) => {
//     const email = eachEmail;
//     userDetail = email;
//     console.log(userDetail);
//     // Loop through all boards to get their Id and names
//     executionObjs.map((boardObj, index) => {
//       const boardId = boardObj.boardId;
//       const boardName = boardObj.boarName;
//       // setTimeout(() => {
//       new Execution(email, boardId);
//       // }, 4000 * index);
//     });
//   });
//   function Execution(email, boardId) {
//     userDetail = email.trim();
//     const message = {
//       email,
//       boardId,
//     };
//     totalAttemptedArray = [];
//     succes = [];
//     failuresArray = [];
//     async function addMember() {
//       const response = await fetch(`${websiteUrl}/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//       totalAttemptedArray.push(1);
//       const data = await response.json();
//       if (data.error) {
//         console.log(data.error);
//         if (data.error.cause.code == "ECONNRESET") {
//           console.log("internet broke error");
//         }
//         failuresArray.push(1);
//         settingProgress(showProgressToUserObj);
//         const showProgressToUserObj = {
//           userDetail,
//           successLength: succes.length,
//           failuresArrayLength: failuresArray.length,
//           totalAttemptedArrayLength: totalAttemptedArray.length,
//         };
//       }
//       const showProgressToUserObj = {
//         userDetail,
//         successLength: succes.length,
//         failuresArrayLength: failuresArray.length,
//         totalAttemptedArrayLength: totalAttemptedArray.length,
//       };
//       succes.push(1);
//       settingProgress(showProgressToUserObj);
//     }
//     addMember().catch((error) => {
//       console.log(error);
//     });
//   }
//   const objToBar = {
//     action,
//     actionTitle,
//     section,
//     userDetail: userDetailNow,
//     userDetailsLength,
//     pageName,
//     failuresArrayLength,
//     successLength,
//     checkedCheckboxesLength,
//     barWidth,
//   };
//   return <ProgressBar progressProps={objToBar} />;
// }
"use strict";