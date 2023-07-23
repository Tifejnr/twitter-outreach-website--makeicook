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

const boardIdCollction= ['6271a3cb5d689870ca61d92b','6271a38e93361c80cb828549','626d3a65cc9a670576324ddf'];

{id: '6271a3cb5d689870ca61d92b', nodeId: 'ari:cloud:trello::board/workspace/none/6271a3cb5d689870ca61d92b', name: 'Bigi', desc: '', descData: null, …}
1
: 
{id: '6271a38e93361c80cb828549', nodeId: 'ari:cloud:trello::board/workspace/none/6271a38e93361c80cb828549', name: 'Carter', desc: '', descData: null, …}
2
: 
{id: '626d3a65cc9a670576324ddf', nodeId: 'ari:cloud:trello::board/workspace/none/626d3a65cc9a670576324ddf', name: 'Halleluha', desc: '', descData: null, …}
3
: 
{id: '626dbffc4138fb19a93d1b41', nodeId: 'ari:cloud:trello::board/workspace/none/626dbffc4138fb19a93d1b41', name: 'IIOokkk', desc: '', descData: null, …}
4
: 
{id: '6271a326714208706052a14c', nodeId: 'ari:cloud:trello::board/workspace/none/6271a326714208706052a14c', name: 'Jesusworks', desc: '', descData: null, …}
5
: 
{id: '6271a2ee19e55a4cf98a8458', nodeId: 'ari:cloud:trello::board/workspace/none/6271a2ee19e55a4cf98a8458', name: 'KaiPOavertz', desc: '', descData: null, …}
6
: 
{id: '625aea88d897212bfa1c0e17', nodeId: 'ari:cloud:trello::board/workspace/none/625aea88d897212bfa1c0e17', name: 'Kanyewest3', desc: '', descData: null, …}
7
: 
{id: '625aea4ee8600859775799da', nodeId: 'ari:cloud:trello::board/workspace/none/625aea4ee8600859775799da', name: 'Kanyewst1', desc: '', descData: null, …}
8
: 
{id: '625aeb443e08cb59c9ccc7c6', nodeId: 'ari:cloud:trello::board/workspace/none/625aeb443e08cb59c9ccc7c6', name: 'Lalie3', desc: '', descData: null, …}
9
: 
{id: '626d3a50c7359688b92e3ff0', nodeId: 'ari:cloud:trello::board/workspace/none/626d3a50c7359688b92e3ff0', name: 'Lerryy', desc: '', descData: null, …}
10
: 
{id: '64794b1c7b0f17d3ad5755f4', nodeId: 'ari:cloud:trello::board/workspace/62d1f236f36bfc85565456ab/64794b1c7b0f17d3ad5755f4', name: 'Lil Tses', desc: '', descData: null, …}
11
: 
{id: '6271a4213e2e2945e24bfec2', nodeId: 'ari:cloud:trello::board/workspace/none/6271a4213e2e2945e24bfec2', name: 'Loiuu', desc: '', descData: null, …}
12
: 
{id: '626459ff33683760c6c4af41', nodeId: 'ari:cloud:trello::board/workspace/none/626459ff33683760c6c4af41', name: 'Loooaaaa', desc: '', descData: null, …}
13
: 
{id: '626dbfe416ef74866cf8b0c9', nodeId: 'ari:cloud:trello::board/workspace/none/626dbfe416ef74866cf8b0c9', name: 'Luiiia', desc: '', descData: null, …}
14
: 
{id: '626d38b61272d43a193909e4', nodeId: 'ari:cloud:trello::board/workspace/none/626d38b61272d43a193909e4', name: 'Mesut', desc: '', descData: null, …}
15
: 
{id: '626d3a77e97b6b7cf74a5871', nodeId: 'ari:cloud:trello::board/workspace/none/626d3a77e97b6b7cf74a5871', name: 'On the jarr', desc: '', descData: null, …}
16
: 
{id: '626d3a6e210d2665616065a8', nodeId: 'ari:cloud:trello::board/workspace/none/626d3a6e210d2665616065a8', name: 'One antion', desc: '', descData: null, …}
17
: 
{id: '626d3875dbf7ad509ed4e587', nodeId: 'ari:cloud:trello::board/workspace/none/626d3875dbf7ad509ed4e587', name: 'Pessi', desc: '', descData: null, …}
18
: 
{id: '626d3a5bd751fb5f0a19f678', nodeId: 'ari:cloud:trello::board/workspace/none/626d3a5bd751fb5f0a19f678', name: 'Picllas', desc: '', descData: null, …}
19
: 
{id: '6271a2dd6bef005582f37781', nodeId: 'ari:cloud:trello::board/workspace/none/6271a2dd6bef005582f37781', name: 'Rooney', desc: '', descData: null, …}
20
: 
{id: '626d3aa0aa89d0450df6eed8', nodeId: 'ari:cloud:trello::board/workspace/none/626d3aa0aa89d0450df6eed8', name: 'Rose', desc: '', descData: null, …}
21
: 
{id: '64794b0cb118e1abeeb90bee', nodeId: 'ari:cloud:trello::board/workspace/62d1f236f36bfc85565456ab/64794b0cb118e1abeeb90bee', name: 'Tsester', desc: '', descData: null, …}
22
: 
{id: '6271a439442d468c0a77024e', nodeId: 'ari:cloud:trello::board/workspace/none/6271a439442d468c0a77024e', name: 'Twentyoo', desc: '', descData: null, …}
23
: 
{id: '625aeb26a978955584bca56d', nodeId: 'ari:cloud:trello::board/workspace/none/625aeb26a978955584bca56d', name: 'Wilal', desc: '', descData: null, …}
24
: 
{id: '62d1f236f36bfc85565456c0', nodeId: 'ari