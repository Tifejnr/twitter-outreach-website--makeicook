import { useRef, useEffect , useState } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import openMemberDetailIcon from "../../../assets/SVGs/faq-toggle-icon.svg"

const memberNotInAnyBoardMessage = "You don't have access to some of the boards below."
let allBoardMemberBelongsArray=[];

export default function MemberInfoDisplay(props) {
  const checkboxRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray);
  const pushMemberCheckboxesArray = useStore((state) => state.pushMemberCheckboxesArray);

  useEffect(() => {
    const checkboxEle = checkboxRef.current;
    pushMemberCheckboxesArray(checkboxEle);
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
 let isBoardMemberAdmin = true, memberIsNotYours = memberNotInAnyBoardMessage,  boardName;

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
  console.log(`Member ${memberDetailObj.username} does not belong to any boards.`);
 isBoardMemberAdmin = false
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

return (
    <form className="eachMemberListCont">
      <section className='member-info-container'>
        <input
          type="checkbox"
          name="select-member"
          title="Check to select member"
          ref={checkboxRef}
          className="inputs board-checkbox"
          id={`checkMembers${props.indexNo}`}
        />
        <article onClick={handleToggle} title="Click to see boards member belongs to">
          <p id={`fullname${props.indexNo}`}>{memberDetailObj.fullName}   
           
           <picture title="Show boards member belongs to" >
              <img style={rotateOnToggle} src={openMemberDetailIcon} alt="show member boards icon" />
            </picture>
          </p>
          <p id={`username${props.indexNo}`}>@{memberDetailObj.username}</p>

         <ul style={openBoardsListStyle}>
          <h3>Boards member belongs to:</h3>
          { isBoardMemberAdmin==false && <p>{memberNotInAnyBoardMessage}</p> }
            {allBoardMemberBelongsArray.length > 0 &&  (
              Array.from(allBoardMemberBelongsArray).map((boardName, index)=> {
                return <li key= {index}>{index+1}. {boardName}</li>
              })
            ) 
          } 
          </ul>
        </article>
      </section>
    </form>
  )
}
