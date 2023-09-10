import React, { useState, useEffect, useRef } from "react";
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
import { changeTabTitle } from "../utilis/changeTabTitle";
import SelectMeans from "./BasicSectionLayout/mean-of-execution/SelectMeans";
import getWorkspacesName from "./getWorkspacesName";
import getAllBoardsId from "./Validations/getBoardIdOnly/getAllBoardsId";
import getMemberId from "./Validations/memberIdSearch/getMemberId";
import MemberInfoDisplay from "./BasicSectionLayout/MemberInfoDisplay";
import { searchMemberList } from "../../JS functions/Utilis/SearchBar";
import isAnyMemberCheckboxChecked from "./Validations/checkboxMembers";
import { isAnyCheckboxChecked } from "../../JS functions/Utilis/Validations/Checkbox";
import getCookies from "../utilis/cookiesSetting/getCookies";


//email means
const emailMeansInputLabel = "Members' Emails:";
const emailMeansInputPlaceholderText =
  "Input emails of members to be added, each separated with comma if more than one.";

const pageTitle = "Add Members to Boards Via";
const action = "Addition";
const continuousAction = "Adding"
const proposition= "to"
const addToBoardsTabTitle= "Add Members to Boards – Collab for Trello"
const timeInterval= 0.2;
const emailMeans = "Email";
const nameMeans= "Name"
const unknowMeansYet="..."
const addMemberTitle= "Add Members"
const defaultMeansMessage= "Select Means of Addition"

//selection  section
const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Add Members to";
const searchMembersPlaceholder = "Search member name ..."

const insufficietCreditsMess= "Please buy credits to use this tool";
const checkboxMustBeCheckedMess= "Please check at least a board below";
const memeberCheckboxMustBeCheckedMess = "Please check at least a member to be added";
const limitOfCheckboxReached = "You can't select more than 20 members at a go."

const errorColor= "#ff3860"

export default function AddMember() {
  const [boardsCollection, setBoardsCollection] = useState([{}]);
  const [openProgressBar, setOpenProgressBar] = useState(false);
 const [labelTitle, setLabelTitle] = useState(addMemberTitle);
 const [executionBtnClicked , setExecutionBtnClicked ] = useState(false);
 const [textAreaError, setTextAreaError ] = useState("");
 const [allUserMemberDetail, setAllUserMemberDetail] = useState([]);
 const [boardIdsMapMemberId, setBoardIdsMapMemberId] = useState([]);
 const [memberRawArrayDetail, setMemberRawArrayDetail] = useState([]);
 const [userUsername, setUserUsername] = useState("");


  const [clientSignature, setClientSignature] = useState("");
  const [boardDetailsObj, setBoardDetailsObj] = useState([])
  const [boardIdsObj, setBoardIdsObj] = useState([])
  const [selectLabel, setSelectLabel] = useState("Select Means of Addition");
  const [ changeLayoutToFlex, setChangeLayoutToFlex] = useState("Select Means of Addition");

  const creditsFromServer = useStore((state) => state.creditsFromServer);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const textAreaValue = useStore((state) => state.textAreaValue);
  const textAreaRefEl = useStore((state) => state.textAreaRefEl);
  const  setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn);
  const executionErrorBtn = useStore((state) => state.executionErrorBtn);
  const  pushWorkspaceObjDetails = useStore((state) => state.pushWorkspaceObjDetails);
  const  workspaceObjDetails = useStore((state) => state.workspaceObjDetails);
  const  meansOfExceution = useStore((state) => state.meansOfExceution);
  const setMeansOfExceution = useStore((state) => state.setMeansOfExceution);
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray);

  changeTabTitle(addToBoardsTabTitle)

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
    executionBtnClicked,
    allUserMemberDetail,
    action,
    continuousAction,
    proposition
  };


 async function validateParams(executionParams) {

    if (creditsFromServer <1) return  setExecutionErrorBtn(insufficietCreditsMess) , setLabelTitle(addMemberTitle);
   setExecutionErrorBtn("")

   if (!isAnyCheckboxChecked(checkboxesArray))   return (
        setExecutionBtnClicked(false),
        setLabelTitle(addMemberTitle),
        setExecutionErrorBtn(checkboxMustBeCheckedMess)
      );

  //only check if member checkbox is checked if it's name means, member list isn't present in email menas
  if (meansOfExceution==nameMeans) {

   if (!isAnyMemberCheckboxChecked(memberCheckboxesArray))   return (
        setExecutionBtnClicked(false),
        setLabelTitle(addMemberTitle),
        setExecutionErrorBtn(memeberCheckboxMustBeCheckedMess)
      );

   }

   const response = await validateAddToBoard(executionParams)

   setTextAreaError("")
   setExecutionErrorBtn("")

   //if it's email means use board id only
  if (meansOfExceution==emailMeans) {
  
   if (response.inputValError) {
    return setExecutionBtnClicked(false), 
           setLabelTitle(addMemberTitle),
           setExecutionErrorBtn(response.inputValError), 
           setTextAreaError(response.inputValError);
    }

   if (response.boardDetailsObj )  {
   setLabelTitle("Starting...") 
    setBoardDetailsObj(response)
    setOpenProgressBar(true)
   }
  }

   if (meansOfExceution==nameMeans) {   
     if (response.nameAddingObjArray )  {
     setLabelTitle("Starting...") 
      setBoardDetailsObj(response)
      setOpenProgressBar(true)
      }
    }
 } 

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
        const token = getCookies();
        if (!token) return  false
      try {
        const fetcbBoardsUrl = `${websiteUrl}/start`;
        const response = await axios.post(
          fetcbBoardsUrl,
          {token},
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
       setMemberRawArrayDetail(memberRawArray);

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
        setAllUserMemberDetail(uniqueMainMemberDetails)
      // and boardIdsMap contains arrays of boardIds for each mainMemberDetail.id
        setBoardIdsMapMemberId(boardIdsMap);
      
      //sort members name alhpabettically using fullname
      uniqueMainMemberDetails.sort((a, b) => a.fullName.localeCompare(b.fullName));

       setAllUserMemberDetail(uniqueMainMemberDetails);
       setBoardIdsObj(allBoardsId);

        //fetch workspace names for each boards
        workspaceIdArray.map(async (workspaceId, index) => {
          const workspaceName = await getWorkspacesName(workspaceId);
          const workspaceDetails = {
            workspaceName,
            workspaceId,
          };
         pushWorkspaceObjDetails(workspaceDetails);
        });

      if (memberRawArray.length > 1) {
          setMemberRawArrayDetail(memberRawArray);
        }

      } catch (error) {
        //handle any error from server or internet
        console.log(error)
        const errorMessage= error.response.data
        //Unauthorized handling
      
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  useEffect(()=> {

    if (meansOfExceution==emailMeans) {
      setChangeLayoutToFlex(false)
    }
    if (meansOfExceution==nameMeans) {
      setChangeLayoutToFlex(true)
    }
     
    // auto pick means picked previously for users by checking local storage
    const meansChosenAddToBoards = localStorage.getItem('meansChosenAddToBoards');
    if (meansChosenAddToBoards) return setMeansOfExceution(meansChosenAddToBoards), setSelectLabel(meansChosenAddToBoards);
   return setSelectLabel(defaultMeansMessage), setMeansOfExceution(defaultMeansMessage);
  }, [meansOfExceution])

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
    borderColor:
      (executionErrorBtn === memeberCheckboxMustBeCheckedMess ||
        executionErrorBtn === limitOfCheckboxReached) &&
      errorColor,
  };

  return (
    <> 
     {
      openProgressBar ? <ProgressExceution executionParams={executionParams} /> :
     <> <HomeNavBar innerText={creditsFromServer==1 ? `Credit:${creditsFromServer}` : 
      `Credits:${creditsFromServer}`} pagelink="#" 
      />
      <section
        className="main-section-cont"
        id="mainContentCont">
        <h1 id="toolInstruction">{pageTitle} {meansOfExceution==defaultMeansMessage ? unknowMeansYet: meansOfExceution}</h1>
        <SelectMeans actionToBePerformed={action} selectLabel={selectLabel}/>

      {!meansOfExceution? "" : meansOfExceution == defaultMeansMessage ? "" : <section style={changeLayoutToFlexStyle} className="inner-main-cont" id="innerMainContentCont">
        { meansOfExceution == emailMeans ? <Input
            inputLabel={emailMeansInputLabel}
            inputPlaceholderText={emailMeansInputPlaceholderText}
            textAreaError={textAreaError}
          /> :  
          
          <section className="membersListsContainer" style={memberListContainerErrorStyle} >
              <h2> All Members - {memberCheckboxesArray.length}</h2>
              <h1 id="memberToDeleteHeading">Select Members to be Added Below</h1>
              <section className='searchSection'>
                <input 
                onKeyUp={searchMemberList}
                  id="searchMembersList"
                  type="text"
                  placeholder={searchMembersPlaceholder} />

               {allUserMemberDetail.length < 2 && (
                  <p className="loading-your-boards-text">
                    Loading all your members ...
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
                            boardIdsObj={boardIdsObj}
                            memberDetailObj= {memberDetailObj}/>
                          );
                        })}
                </section>
            </section>
        } 
    
        <section className="boardsListSection" id="boardsListSection" style={boardContainerErrorStyle} >
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
                          memberRawArrayDetail={memberRawArrayDetail}
                          workspaceObjDetails={workspaceObjDetails}
                        />
                      );
                    })}
                </section>
            </section>
        </section>
}
      </section>
         </>
         }
    </>
  );
}
