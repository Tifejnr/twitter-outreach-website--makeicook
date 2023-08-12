import React, { useState } from "react";
import useStore from "../../Hooks/Zustand/usersStore";

export default function SelectAll(props) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const checkboxRatioNotifierDisplay = useStore(
    (state) => state.checkboxRatioNotifierDisplay
  );
  const setCheckboxRatioNotifierDisplay = useStore(
    (state) => state.setCheckboxRatioNotifierDisplay
  );
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const executionErrorBtn = useStore((state) => state.executionErrorBtn);

    const verifying= props.verifying
    const executionBtnClicked= props.executionBtnClicked

 //display counts of checked to unchecked checkboxes
   const checkboxRatioNotifier = () => {
    const totalCheckboxes = checkboxesArray.length;
    const noOfChecked = checkboxesArray.filter(
      (checkbox) => checkbox.checked
    ).length;

    const checkboxRatioNotifierValue = `${noOfChecked} of ${totalCheckboxes}`;
    setCheckboxRatioNotifierDisplay(checkboxRatioNotifierValue);
  }; 

  //select all checkbox function
 function CheckAll() {
  checkboxesArray.forEach((checkbox) => {
    checkbox.checked = true;
  });

 checkboxRatioNotifier();
}

//deselect all checkbox function
 function UncheckAll() {
  checkboxesArray.forEach((checkbox) => {
    checkbox.checked = false;
  });

 checkboxRatioNotifier();
}

  return (
    <section className="selectionCont" id="selective-btn">
      <h1>{props.selectInstructionText}</h1>
      <section className="selecting-btn-cont">
        {isAllChecked ? (
          <button
            id="clear-select"
            onClick={() => {
              UncheckAll();
              setIsAllChecked(false);
            }}>
            Deselect All
          </button>
        ) : (
          <button
            id="select-all"
            onClick={() => {
              CheckAll();
              setIsAllChecked(true);
            }}>
            Select All
          </button>
        )}

        <button
          className={`execution-btn ${props.executionBtnClicked && "spinning"} `}
          onClick={props.action}>
          { executionBtnClicked ? verifying : props.labelTitle}
        </button>
      </section>
      <p className="execution-btn-error">{executionErrorBtn}</p>

      {!checkboxRatioNotifierDisplay == "" && (
        <p id="para">{checkboxRatioNotifierDisplay}</p>
      )}
    </section>
  );
}
