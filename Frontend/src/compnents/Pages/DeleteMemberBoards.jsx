import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "./BasicSectionLayout/Input";
import SearchBoards from "./BasicSectionLayout/SearchBoards";
import SelectAll from "./BasicSectionLayout/SelectAll";
import HomeNavBar from "../Home-nav-items/HomeNavBar";
import BoardsDisplaySection from "./BasicSectionLayout/BoardsDisplaySection";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import DeleteProgress from "../ProgressBar/DeleteBoards/DeleteProgress";
import validateAddToBoard from "./Validations/validateAddToBoard";
import { changeTabTitle } from "../utilis/changeTabTitle";
import getWorkspacesName from "./getWorkspacesName";
import getAllBoardsId from "./Validations/getBoardIdOnly/getAllBoardsId";
import getMemberId from "./Validations/memberIdSearch/getMemberId";
import MemberInfoDisplay from "./BasicSectionLayout/MemberInfoDisplay";
import { searchMemberList } from "../../JS functions/Utilis/SearchBar";
import { isAnyCheckboxChecked } from "../../JS functions/Utilis/Validations/Checkbox";
import isAnyMemberCheckboxChecked from "./Validations/checkboxMembers";

//set variable to change flex
const changeLayoutToFlex= true;
const errorColor= "#ff3860"

const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Remove Members from";

const pageTitle = "Remove Members from Boards";
const action = "Removal";
const continuousAction = "Removing";
const proposition = "from";
const addToBoardsTabTitle = "Remove Members from Boards – Collab for Trello";
const timeInterval = 0.2;
const deleteMemberTitle = "Remove Members";
const searchMembersPlaceholder = "Search board members name ..."

const insufficietCreditsMess = "Please buy credits to use this tool";
const checkboxMustBeCheckedMess = "Please check at least a board below";
const memeberCheckboxMustBeCheckedMess = "Please check at least a member to be removed";

export default function DeleteMemberBoards() {
  const [boardsCollection, setBoardsCollection] = useState([{}]);
  const [openProgressBar, setOpenProgressBar] = useState(false);
  const [labelTitle, setLabelTitle] = useState(deleteMemberTitle);
  const [executionBtnClicked, setExecutionBtnClicked] = useState(false);
  const [userUsername, setUserUsername] = useState("");
  const [textAreaError, setTextAreaError] = useState("");
  const [memberDetailObj, setMemberDetailObj] = useState("");
  const [boardIdsMapMemberId, setBoardIdsMapMemberId] = useState([]);
  const [allUserMemberDetail, setAllUserMemberDetail] = useState([]);

  const [clientSignature, setClientSignature] = useState("");
  const [boardDetailsObj, setBoardDetailsObj] = useState([]);
  const [boardIdsObj, setBoardIdsObj] = useState([]);

  const creditsFromServer = useStore((state) => state.creditsFromServer);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const textAreaValue = useStore((state) => state.textAreaValue);
  const textAreaRefEl = useStore((state) => state.textAreaRefEl);
  const setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn);
  const executionErrorBtn = useStore((state) => state.executionErrorBtn);
  const pushWorkspaceObjDetails = useStore(
    (state) => state.pushWorkspaceObjDetails
  );
  const workspaceObjDetails = useStore((state) => state.workspaceObjDetails);
  const meansOfExceution = useStore((state) => state.meansOfExceution);
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray);

  changeTabTitle(addToBoardsTabTitle);

  const executionParams = {
    boardsCollection,
    textAreaValue,
    textAreaRefEl,
    timeInterval,
    clientSignature,
    checkboxesArray,
    memberCheckboxesArray,
    boardDetailsObj,
    boardIdsObj,
    meansOfExceution,
    allUserMemberDetail,
    boardIdsMapMemberId,
    executionBtnClicked,
    action,
    continuousAction,
    proposition,
  };

  async function validateParams(executionParams) {

    if (creditsFromServer < 1)
      return (
        setExecutionErrorBtn(insufficietCreditsMess),
        setLabelTitle(deleteMemberTitle)
      );
    setExecutionErrorBtn("");

   if (!isAnyCheckboxChecked(checkboxesArray))   return (
        setExecutionBtnClicked(false),
        setLabelTitle(deleteMemberTitle),
        setExecutionErrorBtn(checkboxMustBeCheckedMess)
      );

   if (!isAnyMemberCheckboxChecked(memberCheckboxesArray))   return (
        setExecutionBtnClicked(false),
        setLabelTitle(deleteMemberTitle),
        setExecutionErrorBtn(memeberCheckboxMustBeCheckedMess)
      );

    const response = await validateAddToBoard(executionParams);

    setTextAreaError("");
    setExecutionErrorBtn("");

      if (response.nameAddingObjArray) {
        setLabelTitle("Starting...");
        setBoardDetailsObj(response);
        setOpenProgressBar(true);
      }

  }

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        const fetcbBoardsUrl = `${websiteUrl}/start`;
        const response = await axios.post(
          fetcbBoardsUrl,
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        if (!dataRaw) {
          console.log("No data seen");
          return;
        }

        const data = dataRaw.boards;
        const signature = dataRaw.sessionSignature;
        const  userUsernameFromServer = dataRaw.userUsername;
        setClientSignature(signature);
        setUserUsername(userUsernameFromServer)

      
        const workspaceIdArray = [
          ...new Set(
            data
              .map((boardsDetail) => boardsDetail.idOrganization)
              .filter(Boolean)
          ),
        ];
        setBoardsCollection(data);

        //fetch all board ids for usernames and fullnames method of addition
        const allBoardsId = getAllBoardsId(data);
        const memberDetailsResponse = await getMemberId(allBoardsId);

        const memberRawArray = memberDetailsResponse.allMembersDetails;

      const uniqueIds = new Set();
      const uniqueMainMemberDetails = [];
      const boardIdsMap = {}; // Object to store boardIds for each mainMemberDetail.id

        memberRawArray.forEach((memberDetail) => {
          const boardId = memberDetail.boardId;
          const rawMemberDetail = memberDetail.boardMembersDetails;
          rawMemberDetail.forEach((mainMemberDetail) => {
            const { id, username, fullName } = mainMemberDetail; // Destructure the relevant properties
            if (!uniqueIds.has(id)) {
              mainMemberDetail.boardId = boardId;
              uniqueIds.add(id);
              uniqueMainMemberDetails.push(mainMemberDetail);
            } else {
              // If the id already exists, add the boardId to the associated array
              if (!boardIdsMap[id]) {
                boardIdsMap[id] = [boardId];
              } else {
                boardIdsMap[id].push(boardId);
              }
            }
          });
        });

      // Now, uniqueMainMemberDetails contains the unique mainMemberDetails with boardId,
        console.log(uniqueMainMemberDetails);
        setAllUserMemberDetail(uniqueMainMemberDetails)
      // and boardIdsMap contains arrays of boardIds for each mainMemberDetail.id
        console.log(boardIdsMap);
        setBoardIdsMapMemberId(boardIdsMap)

      //fetch and get all unique memebers ids and details
        memberRawArray.forEach((memberDetail) => {
          const boardId = memberDetail.boardId
          const rawMemberDetail= memberDetail.boardMembersDetails
          rawMemberDetail.forEach((mainMemberDetail) => {
            if (!uniqueIds.has(mainMemberDetail.id)) {
              mainMemberDetail.boardId= boardId
              uniqueIds.add(mainMemberDetail.id);
              uniqueMainMemberDetails.push(mainMemberDetail);
            }
          });
        });
      
      //sort members name alhpabettically using fullname
      uniqueMainMemberDetails.sort((a, b) => a.fullName.localeCompare(b.fullName));

      console.log(uniqueMainMemberDetails)

       setAllUserMemberDetail(uniqueMainMemberDetails);
       setBoardIdsObj(allBoardsId);

        //fetch workspace names for each boards
        workspaceIdArray.map(async (workspaceId, index) => {
          const workspaceName = await getWorkspacesName(workspaceId);
          const workspaceDetails = {
            workspaceName,
            workspaceId,
          };
          return pushWorkspaceObjDetails(workspaceDetails);
        });
      } catch (error) {
        //handle any error from server or internet
        console.log(error);
        const errorMessage = error.response.data;
        //Unauthorized handling
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);


   //changeLayoutToFlex style if it's name means
    const changeLayoutToFlexStyle= {
        display: changeLayoutToFlex && "flex",
     }

   //Error noti on Board List container
    const boardContainerErrorStyle= {
        borderColor: executionErrorBtn == checkboxMustBeCheckedMess && errorColor
     }

   //Error noti on  memberList container
    const memberListContainerErrorStyle = {
        borderColor: executionErrorBtn == memeberCheckboxMustBeCheckedMess && errorColor
     }


  return (
    <>
      {openProgressBar ? (
        <DeleteProgress executionParams={executionParams} />
      ) : (
        <>
          {" "}
          <HomeNavBar
            innerText={
              creditsFromServer == 1
                ? `Credit:${creditsFromServer}`
                : `Credits:${creditsFromServer}`
            }
            pagelink="#"
          />
          <section className="main-section-cont" id="mainContentCont">
            <h1 id="toolInstruction">
              {pageTitle}
            </h1>
            {/* <SelectMeans
              actionToBePerformed={action}
              selectLabel={selectLabel}
            /> */}

        <section style={changeLayoutToFlexStyle} className="inner-main-cont" id="innerMainContentCont">

            <section className="membersListsContainer"  style={memberListContainerErrorStyle} >
                <h1>{memberCheckboxesArray.length} Board Members</h1>
                <h1 id="memberToDeleteHeading">Select Members to be Removed Below</h1>
              <section className='searchSection'>
                <input 
                onKeyUp={searchMemberList}
                  id="searchMembersList"
                  type="text"
                  placeholder={searchMembersPlaceholder} />

              {allUserMemberDetail.length < 2 && (
                  <p className="loading-your-boards-text">
                    Loading all your boards members ...
                  </p>
              )}              
                  
              </section>
                    <section className="member-list-cont">
                      {allUserMemberDetail.length > 1 &&
                        allUserMemberDetail.map((memberDetailObj, index) => {

                          if (memberDetailObj.username==userUsername ) return false;

                          return (
                          <MemberInfoDisplay
                            key= {index}
                            indexNo= {index}
                            boardsCollection={boardsCollection}
                            boardIdsMapMemberId={boardIdsMapMemberId}
                            memberDetailObj= {memberDetailObj}/>
                          );
                        })}
                </section>
            </section>

              <section style={boardContainerErrorStyle} className="boardsListSection" id="boardsListSection">
                <SelectAll
                  labelTitle={labelTitle}
                  verifying="Verifying Inputs..."
                  executionBtnClicked={executionBtnClicked}
                  selectInstructionText={selectInstructionText}
                  action={async (e) => {
                    e.preventDefault();
                    setExecutionBtnClicked(
                      (executionBtnClicked) => !executionBtnClicked
                    );
                    setTextAreaError("");
                    await validateParams(executionParams);
                  }}
                />

                <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle} />

                {boardsCollection.length < 2 && (
                  <p className="loading-your-boards-text">
                    Loading your boards and their workspaces...
                  </p>
                )}

                <section className="all-boardnames-container">
                  {boardsCollection.length > 1 &&
                    boardsCollection.map((board, index) => {
                      return (
                        <BoardsDisplaySection
                          key={index}
                          board={board}
                          indexNo={index}
                          workspaceObjDetails={workspaceObjDetails}
                        />
                      );
                    })}
                </section>
              </section>
              </section>
       
          </section>
        </>
      )}
    </>
  );
}
