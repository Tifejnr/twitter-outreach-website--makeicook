import { useState, useEffect, useRef } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import openBoardsDetailIcon from "../../../assets/SVGs/faq-toggle-icon.svg"

export default function BoardsDisplaySection(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [boardMembersObj, setBoardMembersObj] = useState([]);
  const checkboxRef = useRef(null);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const pushCheckboxesArray = useStore((state) => state.pushCheckboxesArray);
  const setCheckboxRatioNotifierDisplay = useStore(
    (state) => state.setCheckboxRatioNotifierDisplay
  );

  const workspaceObjDetails = props.workspaceObjDetails;
  const board = props.board

  const checkboxRatioNotifier = () => {
    const totalCheckboxes = checkboxesArray.length;
    const noOfChecked = checkboxesArray.filter(
      (checkbox) => checkbox.checked
    ).length;

    const checkboxRatioNotifierValue = `${noOfChecked} of ${totalCheckboxes}`;
    setCheckboxRatioNotifierDisplay(checkboxRatioNotifierValue);
  };

    //getting product details first
    const isWorkspaceDetailsValid = workspaceObjDetails.find(
      (workspaceDetail) => workspaceDetail.workspaceId == board.idOrganization
    );  


  useEffect(() => {
    const checkboxEle = checkboxRef.current;
    pushCheckboxesArray(checkboxEle);

  }, []);


  function loadAllBoardMembersName () {

  setIsClicked((prevState)=>!prevState)  
  const memberRawArrayDetail = props.memberRawArrayDetail;
  //find board members for each boards
  const allboardMembersObj = memberRawArrayDetail.find((memberDetail) => memberDetail.boardId === board.id);
  const boardMembersObjAlone = allboardMembersObj.boardMembersDetails;

  if (boardMembersObjAlone) return setBoardMembersObj(boardMembersObjAlone)

  }

  //setting toglig
   const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)"
  };

 const openFaqDetailsStyle= {
     maxHeight: isClicked ?  "100%" :"0",
        marginTop: isClicked ? '0.8rem' :"-0.4rem",
        overflow: isClicked ?  'visible': "hidden",
 }

  return (
    <form className="boardListItem eachMemberListCont" name="main">
      <section className='member-info-container'>
          <input
          onClick={checkboxRatioNotifier}
          type="checkbox"
          name="fruit"
          title="Check to select board"
          ref={checkboxRef}
          className="inputs board-checkbox"
          id={`check${props.indexNo}`}
        />
      <article onClick={loadAllBoardMembersName} title="Click to show members">

        <p id={`labelcheck${props.indexNo}`}>        
          {board.name} 
           
           <picture title="Click to show members">
              <img style={rotateOnToggle} src={openBoardsDetailIcon} alt="show member icon" />
            </picture>
        </p>

        <p>{ isWorkspaceDetailsValid ? `WS - ${isWorkspaceDetailsValid.workspaceName}`: "WS - None"}</p>

         <ul style={openFaqDetailsStyle}>
            <h3>Members:</h3>

            {boardMembersObj.length > 0 && boardMembersObj.map((memberDetail, index)=> {
                return <li key={index}>{index+1}. {memberDetail.fullName}</li>
              })}
          </ul> 

    </article>
    </section>
    </form>
  );
}


