import { useRef, useEffect } from "react";
import useStore from "../../Hooks/Zustand/usersStore";

export default function MemberInfoDisplay(props) {
  const checkboxRef = useRef(null);
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray);
  const pushMemberCheckboxesArray = useStore((state) => state.pushMemberCheckboxesArray);

  useEffect(() => {
    const checkboxEle = checkboxRef.current;
    pushMemberCheckboxesArray(checkboxEle);
  }, []);

  const memberDetailObj = props.memberDetailObj;
  // const member
  const workspaceObjDetails = props.workspaceObjDetails;
  const boardsCollection = props.boardsCollection;


    //getting all board names that each memeber belongs to

  function getBoardsForMember(memberId, boardsCollection) {
  // Initialize an empty array to store the board names.
  const memberBoards = [];

  // Find boards that match the memberId.
  for (const board of boardsCollection) {
    if (board.boardId === memberId) {
      memberBoards.push(board.boardName);
    }
  }

  return memberBoards;
}

    const allBoardMemberBelongsArray = boardsCollection.map((board)=> {
      const isMemberPartOfBoard = boardsCollection.find(
      (boardDetail) => boardDetail.id == memberDetailObj.boardId
    );

    if (!isMemberPartOfBoard) return false;

    const boardName = isMemberPartOfBoard.name

    return boardName 
    })
  

return (
  props.userUsername === memberDetailObj.username ? null : (
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
        <article>
          <p id={`fullname${props.indexNo}`}>{memberDetailObj.fullName}</p>
          <p id={`username${props.indexNo}`}>@{memberDetailObj.username}</p>
        </article>
      </section>
    </form>
  )
);

}
