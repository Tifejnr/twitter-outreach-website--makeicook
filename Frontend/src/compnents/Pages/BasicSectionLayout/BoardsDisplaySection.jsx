import { useState, useEffect, useRef } from "react";
import useStore from "../../Hooks/Zustand/usersStore";

export default function BoardsDisplaySection(props) {
  const checkboxRef = useRef(null);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const pushCheckboxesArray = useStore((state) => state.pushCheckboxesArray);
  const setCheckboxRatioNotifierDisplay = useStore(
    (state) => state.setCheckboxRatioNotifierDisplay
  );

  const checkboxRatioNotifier = () => {
    const totalCheckboxes = checkboxesArray.length;
    const noOfChecked = checkboxesArray.filter(
      (checkbox) => checkbox.checked
    ).length;

    const checkboxRatioNotifierValue = `${noOfChecked} of ${totalCheckboxes}`;
    setCheckboxRatioNotifierDisplay(checkboxRatioNotifierValue);
  };

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
          {props.board.name}
        </label>
      </article>
    </form>
  );
}
