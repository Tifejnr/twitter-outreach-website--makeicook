import React, { useState } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import CheckAll from "../../../JS functions/Utilis/Selections.jsx/CheckAll";
import UncheckAll from "../../../JS functions/Utilis/Selections.jsx/UncheckAll";

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

  const checkboxRatioNotifier = () => {
    const totalCheckboxes = checkboxesArray.length;
    const noOfChecked = checkboxesArray.filter(
      (checkbox) => checkbox.checked
    ).length;

    const checkboxRatioNotifierValue = `${noOfChecked} of ${totalCheckboxes}`;
    setCheckboxRatioNotifierDisplay(checkboxRatioNotifierValue);
  };

  return (
    <section className="selectionCont" id="selective-btn">
      <h1>{props.selectInstructionText}</h1>
      <section className="selecting-btn-cont">
        {isAllChecked ? (
          <button
            id="clear-select"
            onClick={() => {
              UncheckAll(checkboxesArray);
              checkboxRatioNotifier();
              setIsAllChecked(false);
            }}>
            Deselect All
          </button>
        ) : (
          <button
            id="select-all"
            onClick={() => {
              CheckAll(checkboxesArray);
              checkboxRatioNotifier();
              setIsAllChecked(true);
            }}>
            Select All
          </button>
        )}

        <button
          className="execution-btn"
          id="deleting-btn"
          onClick={props.action}>
          {props.labelTitle}
        </button>
      </section>
      <p className="execution-btn-error">{executionErrorBtn}</p>

      {!checkboxRatioNotifierDisplay == "" && (
        <p id="para">{checkboxRatioNotifierDisplay}</p>
      )}
    </section>
  );
}
