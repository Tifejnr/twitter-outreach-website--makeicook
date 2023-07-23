import React, { useState, useEffect, useContext } from "react";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressBar from "./ProgressBar";

let totalAttemptedArray,
  userDetailsLength,
  totalDurationLength,
  successLength

const action = "Addition";
const actionTitle = "Adding";
const section = "boards";
const pageName = "add-member";

export default function ProgressExceution(props) {
  const [userDetail, setUserDetail] = useState("");
  const [failuresLength, setFailuresLength] = useState(0);
  const [sucessLength, setSucessLength] = useState(0);
  const [totalAttemptedLength, setTotalAttemptedLength] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  //props collections
  const emailInputs = props.executionParams.textAreaValue;
  const boardDetailsObj = props.executionParams.executionObjs;
  const checkedCheckboxesLength = props.executionParams.checkedCheckboxesLength;

  const emailListSplited = emailInputs.split(",");
  const flattenedEmailList =  [emailInputs];

  console.log(flattenedEmailList)
  userDetailsLength = Number(emailListSplited.length);
  totalDurationLength = Number(checkedCheckboxesLength) * userDetailsLength;

  const serverParams= {
        flattenedEmailList,
        boardDetailsObj
      }
  console.log(serverParams)
    addMember()
    async function addMember() {

      const response = await fetch(`${websiteUrl}/add`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(serverParams),
      });

      setTotalAttemptedLength((prev) => prev+1)
      const data = await response.json();

      console.log(data)
  //     if (data.error) {
  //       console.log(data.error);
  //       if (data.error.cause.code == "ECONNRESET") {
  //         console.log("internet broke error");
  //       }

  //       // Increment failuresLength and update progress
  //   return( setFailuresLength((prevValue)=>prevValue+1),     
  //             setBarWidth((Number(totalAttemptedLength) / Number(totalDurationLength)) * 100)
  //     )
  //     }

  //     // Increment successLength and update progress
  // return( setSucessLength((prevValue)=>prevValue + 1),     
  //             setBarWidth((Number(totalAttemptedLength) / Number(totalDurationLength)) * 100)
  //     )
    }   

    addMember().catch((error) => {
      console.log(error);
    });



  const objToBar = {
    action,
    actionTitle,
    section,
    userDetail,
    userDetailsLength,
    pageName,
    failuresLength,
    sucessLength,
    checkedCheckboxesLength,
    barWidth,
  };

  return <ProgressBar progressProps={objToBar} />;
}
