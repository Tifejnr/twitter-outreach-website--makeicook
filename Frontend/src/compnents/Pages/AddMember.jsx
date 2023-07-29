import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { MyContext } from "../Hooks/Contexts/UserContext";
import Input from "./BasicSectionLayout/Input";
import SearchBoards from "./BasicSectionLayout/SearchBoards";
import SelectAll from "./BasicSectionLayout/SelectAll";
import ProgressBar from "../ProgressBar/ProgressBar";
import AddToBoard from "../../JS functions/AddToBoard";
import HomeNavBar from "../Home-nav-items/HomeNavBar";
import LoggedInUsersControl from "../Controllers/LoggedInUsersControl";
import BoardsDisplaySection from "./BasicSectionLayout/BoardsDisplaySection";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressExceution from "../ProgressBar/ProgressExceution.jsx";
import { findBoardIdByName } from "../../JS functions/Utilis/FindBoardId/byName";

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
  const {
    textAreaValue,
    setc,
    textAreaRefEl,
    setd,
    timeInterval,
    setT,
    timeIntervalRef,
  } = useContext(MyContext);

  const [clientSignature, setClientSignature] = useState("");
  // const taskTitle = useStore((state) => state.taskTitle);
  // const setTaskTitle = useStore((state) => state.setTaskTitle);
  // const [executionObjs, setexecutionObjs] = useState([])
  const [pageContentElRef, setPageContentElRef] = useState(null);

  const pageContentRef = useRef(null);

  const executionParams = {
    boardsCollection,
    textAreaValue,
    textAreaRefEl,
    timeInterval,
    timeIntervalRef,
    pageContentElRef,
    clientSignature,
  };

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

        if (dataRaw.error) {
          console.log(dataRaw.error);

          if (dataRaw.error.code === "ENOTFOUND") {
            console.log("No internet network");
            return;
          }
        }

        const data = dataRaw.boards;
        const signature = dataRaw.sessionSignature;
        setBoardsCollection(data);
        setClientSignature(signature);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    setPageContentElRef(pageContentRef.current);
  }, [boardsCollection]);

  if (boardsCollection === null)
    return console.log("boards not available");

  return (
    <>
      <LoggedInUsersControl>
      <HomeNavBar />

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
            action={(e) => {
              AddToBoard(executionParams);
            }}
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle} />

          {boardsCollection.map((board, index) => {
            return (
              <BoardsDisplaySection key={index} board={board} indexNo={index} />
            );
          })}
        </section>
      </section>
      <ProgressBar pageName={pageName} />
      </LoggedInUsersControl>
    </>
  );
}
