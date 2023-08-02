import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./BasicSectionLayout/Input";
import SearchBoards from "./BasicSectionLayout/SearchBoards";
import SelectAll from "./BasicSectionLayout/SelectAll";
import HomeNavBar from "../Home-nav-items/HomeNavBar";
import BoardsDisplaySection from "./BasicSectionLayout/BoardsDisplaySection";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressExceution from "../ProgressBar/ProgressExceution.jsx";
import validateAddToBoard from "./Validations/validateAddToBoard";

const labelTitle = "Add Members";
const inputLabel = "Members' Emails:";
const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Add Members to";
const inputPlaceholderText =
  "Input emails of members to be added, each separated with a comma.";
const pageName = "add-member";
const pageTitle = "Add Members Via Email";
const action = "adding";

export default function AddMember() {
  const [boardsCollection, setBoardsCollection] = useState(null);
  const [openProgressBar, setOpenProgressBar] = useState(false);

  const [clientSignature, setClientSignature] = useState("");
  const [boardDetailsObj, setBoardDetailsObj] = useState([])
  const [pageContentElRef, setPageContentElRef] = useState(null);
  const creditsFromServer = useStore((state) => state.creditsFromServer);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const textAreaValue = useStore((state) => state.textAreaValue);
  const textAreaRefEl = useStore((state) => state.textAreaRefEl);
  const timeInterval = useStore((state) => state.timeInterval);
  const timeIntervalRef = useStore((state) => state.timeIntervalRef);
  const  setExecutionErrorBtn = useStore((state) => state. setExecutionErrorBtn);

  const pageContentRef = useRef(null);
  const navigate = useNavigate();

  const executionParams = {
    boardsCollection,
    textAreaValue,
    textAreaRefEl,
    timeInterval,
    timeIntervalRef,
    pageContentElRef,
    clientSignature,
    checkboxesArray,
    boardDetailsObj,
    creditsFromServer  
  };

  const insufficietCreditsMess= "Please buy credits to use this tool"
  const checkboxMustBeCheckedMess= "Please check at least a board below to continue"

  function validateParams(executionParams) {

    if (creditsFromServer <1) return  setExecutionErrorBtn(insufficietCreditsMess) 
   setExecutionErrorBtn("")

   const response=  validateAddToBoard(executionParams)
   if (response.inputValError) return setExecutionErrorBtn(response.inputValError);
  setExecutionErrorBtn("")

   if (response.noCheckboxChecked) return setExecutionErrorBtn(checkboxMustBeCheckedMess);
  setExecutionErrorBtn("")

   if (response.boardDetailsObj )  {
    const boardIdAndNameObj= response.boardDetailsObj
    setBoardDetailsObj(boardIdAndNameObj)

    setOpenProgressBar(true)

   }

  }

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        const url = `${websiteUrl}/start`;
        const response = await axios.post(
          url,
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        if (!dataRaw) {
          console.log("No data seen");
          return;
        }

        const data = dataRaw.boards;
        const signature = dataRaw.sessionSignature;
        setBoardsCollection(data);
        setClientSignature(signature);
      } catch (error) {
        //handle any error from server or internet
        const errorMessage= error.response.data
        //Unauthorized handling
        if (errorMessage.unauthorizedToken) return navigate('/');
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    setPageContentElRef(pageContentRef.current);
  }, []);

  if (boardsCollection === null)
    return "";

  return (
    <> 
     {
      openProgressBar ? <ProgressExceution executionParams={executionParams} /> :
     <> <HomeNavBar innerText={creditsFromServer==1 ? `Credit:${creditsFromServer}`: 
      
      `Credits:${creditsFromServer}`} pagelink="#" 
      
      />

      <section
        className="main-section-cont"
        id="mainContentCont"
        ref={pageContentRef}>
        <h1 id="toolInstruction">{pageTitle}</h1>

        <section className="inner-main-cont" id="innerMainContentCont">
          <Input
            inputLabel={inputLabel}
            inputPlaceholderText={inputPlaceholderText}
          />
          <SelectAll
            labelTitle={labelTitle}
            selectInstructionText={selectInstructionText}
            action={ (e)=> {
             e.preventDefault()
              validateParams(executionParams)
            } }
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle} />

          {boardsCollection.map((board, index) => {
            return (
              <BoardsDisplaySection key={index} board={board} indexNo={index} />
            );
          })}
        </section>
      </section>
         </>
         }
    </>
  );
}
