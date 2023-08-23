import { useRef, useEffect , useState } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import openMemberDetailIcon from "../../../assets/SVGs/faq-toggle-icon.svg"

const memberNotInAnyBoardMessage = "You don't have access to some of the boards below."
const limitOfCheckboxReached = "You can't select more than 20 members at a go."
let allBoardMemberBelongsArray=[];

export default function MemberInfoDisplay(props) {
  const checkboxRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray);
  const pushMemberCheckboxesArray = useStore((state) => state.pushMemberCheckboxesArray);
  const setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn);

  useEffect(() => {

    if (isBoardMemberAdmin) {
    const checkboxEle = checkboxRef.current;
    pushMemberCheckboxesArray(checkboxEle);
    }
  }, []);

  const memberDetailObj = props.memberDetailObj;
  const memberId = memberDetailObj.id;
  const boardIdsMapMemberId = props.boardIdsMapMemberId;
  const boardsCollection = props.boardsCollection;

    //getting all board names that each memeber belongs to
function getBoardsForMember(memberId, boardIdsMapMemberId) {
  if (boardIdsMapMemberId[memberId]) {
    return boardIdsMapMemberId[memberId];
  } else {
    return []; // Return an empty array if the memberId is not found in boardIdsMapMemberId
  }
}

const memberBoardsArray = getBoardsForMember(memberId, boardIdsMapMemberId);
 let isBoardMemberAdmin = true; let memberIsNotYours = memberNotInAnyBoardMessage,  boardName;

if (memberBoardsArray.length > 0) {
  allBoardMemberBelongsArray = memberBoardsArray.map((boardId) => {
    const isMemberPartOfBoard = boardsCollection.find(
      (boardDetail) => boardDetail.id === boardId
    );

    if (!isMemberPartOfBoard)  return  

     boardName = isMemberPartOfBoard.name;
    return boardName;
  });
} else {

  return  isBoardMemberAdmin = false
}
   //setting toggling when clicked
  const handleToggle= ()=> {
     setIsClicked((prevState)=>!prevState)
  }

   const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)"
  };

 const openBoardsListStyle= {
        maxHeight: isClicked ?  "100%" : "0",
        marginTop: isClicked ? '0.8rem' : "-0.4rem",
        overflow: isClicked ?  'visible' : "hidden",
  } 

 //limit no of checkboxes of member to 20  
function limitOnCheckableMembersNo() {
  const noOfChecked = memberCheckboxesArray.filter(
    (checkbox) => checkbox.checked
  ).length;

  const checkboxEle = checkboxRef.current;

  if (noOfChecked > 20) {
    // If the number of checked checkboxes is greater than 2, set an error state and uncheck the current checkbox.
    setExecutionErrorBtn(limitOfCheckboxReached); // Assuming "limitOfCheckboxReached" is a string error message.
    checkboxEle.checked = false;
  } 
}

return (
  isBoardMemberAdmin && (
    <form className="member-list-form eachMemberListCont">
      <section className='member-info-container'>
        <input
        onClick={limitOnCheckableMembersNo}
          type="checkbox"
          name="select-member"
          title="Check to select member"
          ref={checkboxRef}
          className="inputs board-checkbox"
          id={`checkMembers${props.indexNo}`}
        />
        <article onClick={handleToggle} title="Click to see boards member belongs to">
          <p id={`fullname${props.indexNo}`}>{memberDetailObj.fullName}
           
           <picture title="Show boards member belongs to">
              <img style={rotateOnToggle} src={openMemberDetailIcon} alt="show member boards icon" />
            </picture>
          </p>
          <p id={`username${props.indexNo}`}>@{memberDetailObj.username}</p>

          <ul style={openBoardsListStyle}>
            <h3>Boards member belongs to:</h3>
      
            {allBoardMemberBelongsArray.length > 0 && (
              Array.from(allBoardMemberBelongsArray).map((boardName, index) => {
                return <li key={index}>{index + 1}. {boardName}</li>
              })
            )} 
          </ul>
        </article>
      </section>
    </form>
  )
)

}
