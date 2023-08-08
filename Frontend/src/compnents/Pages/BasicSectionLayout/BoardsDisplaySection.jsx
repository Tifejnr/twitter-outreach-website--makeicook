import { useState, useEffect, useRef } from "react";
import useStore from "../../Hooks/Zustand/usersStore";

export default function BoardsDisplaySection(props) {
  const [workspaceName, setWorkspaceName] =useState("");
  const checkboxRef = useRef(null);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const pushCheckboxesArray = useStore((state) => state.pushCheckboxesArray);
  const setCheckboxRatioNotifierDisplay = useStore(
    (state) => state.setCheckboxRatioNotifierDisplay
  );

  const workspaceObjDetails= props.workspaceObjDetails
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

  return (
    <form className="item" name="main">
      <article className="label-article">
        <input
          onClick={checkboxRatioNotifier}
          type="checkbox"
          name="fruit"
          ref={checkboxRef}
          className="inputs board-checkbox"
          id={`check${props.indexNo}`}
        />
        <label
          htmlFor={`check${props.indexNo}`}
          id={`labelcheck${props.indexNo}`}>
          {board.name}
        </label>
      </article>
      <p>{ isWorkspaceDetailsValid ? isWorkspaceDetailsValid.workspaceName: "Not under any workspace yet"}</p>
    </form>
  );
}
