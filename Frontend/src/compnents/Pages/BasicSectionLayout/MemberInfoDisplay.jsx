import { useRef, useEffect, useState } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import openMemberDetailIcon from "../../../assets/SVGs/faq-toggle-icon.svg";

// Define some constant messages
const memberNotInAnyBoardMessage = "You don't have access to some of the boards below.";
const limitOfCheckboxReached = "You can't select more than 20 members at a go.";
let allBoardMemberBelongsArray = []; // Initialize an array to store board names.

// This is the main component function.
export default function MemberInfoDisplay(props) {
  const checkboxRef = useRef(null); // Reference to the checkbox element.
  const [isClicked, setIsClicked] = useState(false); // State for tracking clicks.
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray); // Get member checkboxes from Zustand state.
  const pushMemberCheckboxesArray = useStore((state) => state.pushMemberCheckboxesArray); // Get a function to update the checkboxes array from Zustand.
  const setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn); // Get a function to set an error message from Zustand.

  // useEffect is used for side effects in React. This effect runs once when the component mounts.
  useEffect(() => {
    // If the member is a board admin, push the checkbox reference to the checkboxes array.
    if (isBoardMemberAdmin) {
      const checkboxEle = checkboxRef.current;
      pushMemberCheckboxesArray(checkboxEle);
    }
  }, []);

  // Extract member details and board information from props.
  const memberDetailObj = props.memberDetailObj;
  const memberId = memberDetailObj.id;
  const boardIdsMapMemberId = props.boardIdsMapMemberId;
  const boardsCollection = props.boardsCollection;

  // Function to get the boards a member belongs to.
  function getBoardsForMember(memberId, boardIdsMapMemberId) {
    if (boardIdsMapMemberId[memberId]) {
      return boardIdsMapMemberId[memberId];
    } else {
      return []; // Return an empty array if the memberId is not found in boardIdsMapMemberId.
    }
  }

  // Initialize some variables.
  const memberBoardsArray = getBoardsForMember(memberId, boardIdsMapMemberId);
  let isBoardMemberAdmin = true; // Assuming the member is initially considered an admin.
  let boardName;

  // Check if the member belongs to any boards.
  if (memberBoardsArray.length > 0) {
    // Map the member's board IDs to board names.
    allBoardMemberBelongsArray = memberBoardsArray.map((boardId) => {
      // Check if the board exists in the collection.
      const isMemberPartOfBoard = boardsCollection.find(
        (boardDetail) => boardDetail.id === boardId
      );

      if (!isMemberPartOfBoard) return;

      boardName = isMemberPartOfBoard.name;
      return boardName;
    });
  } else {
    // If the member doesn't belong to any boards, update the admin status.
    isBoardMemberAdmin = false;
  }

  // Function to toggle the open/close state.
  const handleToggle = () => {
    setIsClicked((prevState) => !prevState);
  };

  // Style for rotating the toggle icon.
  const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)",
  };

  // Style for opening/closing the boards list.
  const openBoardsListStyle = {
    maxHeight: isClicked ? "100%" : "0",
    marginTop: isClicked ? "0.8rem" : "-0.4rem",
    overflow: isClicked ? "visible" : "hidden",
  };

  // Function to limit the number of checked checkboxes.
  function limitOnCheckableMembersNo() {
    const noOfChecked = memberCheckboxesArray.filter(
      (checkbox) => checkbox.checked
    ).length;

    const checkboxEle = checkboxRef.current;

    if (noOfChecked > 20) {
      // If the number of checked checkboxes is greater than 20, set an error state and uncheck the current checkbox.
      setExecutionErrorBtn(limitOfCheckboxReached);
      checkboxEle.checked = false;
    }
  }

  // Render the component.
  return (
    // isBoardMemberAdmin && ( // Render the following only if the member is an admin.
      <form className="member-list-form eachMemberListCont">
        <section className="member-info-container">
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
                  return <li key={index}>{index + 1}. {boardName}</li>;
                })
              )}
            </ul>
          </article>
        </section>
      </form>
    // )
  );
}
