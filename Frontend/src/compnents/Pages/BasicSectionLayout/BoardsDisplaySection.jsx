import { useState, useEffect, useRef } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import openBoardsDetailIcon from "../../../assets/SVGs/faq-toggle-icon.svg";

// This component displays board information.
export default function BoardsDisplaySection(props) {
  const [isClicked, setIsClicked] = useState(false); // State to track click events.
  const [boardMembersObj, setBoardMembersObj] = useState([]); // State to store board members.
  const checkboxRef = useRef(null); // Reference to the checkbox element.
  const checkboxesArray = useStore((state) => state.checkboxesArray); // Get checkboxes from Zustand state.
  const pushCheckboxesArray = useStore((state) => state.pushCheckboxesArray); // Get a function to update checkboxes from Zustand.
  const setCheckboxRatioNotifierDisplay = useStore(
    (state) => state.setCheckboxRatioNotifierDisplay
  ); // Get a function to display checkbox ratio from Zustand.

  const workspaceObjDetails = props.workspaceObjDetails; // Workspace details.
  const board = props.board; // Board details.

  // Function to calculate and display the checkbox ratio.
  const checkboxRatioNotifier = () => {
    const totalCheckboxes = checkboxesArray.length;
    const noOfChecked = checkboxesArray.filter(
      (checkbox) => checkbox.checked
    ).length;

    const checkboxRatioNotifierValue = `${noOfChecked} of ${totalCheckboxes}`;
    setCheckboxRatioNotifierDisplay(checkboxRatioNotifierValue);
  };

  // Check if the workspace details are valid for the board.
  const isWorkspaceDetailsValid = workspaceObjDetails.find(
    (workspaceDetail) => workspaceDetail.workspaceId == board.idOrganization
  );

  // useEffect to push the checkbox element into the checkboxes array when the component mounts.
  useEffect(() => {
    const checkboxEle = checkboxRef.current;
    pushCheckboxesArray(checkboxEle);
  }, []);

  // Function to load and display board members when the "show members" button is clicked.
  function loadAllBoardMembersName() {
    setIsClicked((prevState) => !prevState);
    const memberRawArrayDetail = props.memberRawArrayDetail;

    // Find board members for the current board.
    const allboardMembersObj = memberRawArrayDetail.find(
      (memberDetail) => memberDetail.boardId === board.id
    );
    const boardMembersObjAlone = allboardMembersObj.boardMembersDetails;

    if (boardMembersObjAlone) return setBoardMembersObj(boardMembersObjAlone);
  }

  // Style for rotating the "show members" icon.
  const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)",
  };

  // Style for opening/closing the member list.
  const openFaqDetailsStyle = {
    maxHeight: isClicked ? "100%" : "0",
    marginTop: isClicked ? "0.8rem" : "-0.4rem",
    overflow: isClicked ? "visible" : "hidden",
  };

  // Render the component.
  return (
    <form className="boardListItem eachMemberListCont" name="main">
      <section className="member-info-container">
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
              <img
                style={rotateOnToggle}
                src={openBoardsDetailIcon}
                alt="show member icon"
              />
            </picture>
          </p>
          <p>
            {isWorkspaceDetailsValid
              ? `WS - ${isWorkspaceDetailsValid.workspaceName}`
              : "WS - None"}
          </p>
          <ul style={openFaqDetailsStyle}>
            <h3>Members:</h3>
            {boardMembersObj.length > 0 &&
              boardMembersObj.map((memberDetail, index) => {
                return (
                  <li key={index}>
                    {index + 1}. {memberDetail.fullName}
                  </li>
                );
              })}
          </ul>
        </article>
      </section>
    </form>
  );
}
