import { useState, useEffect, useRef } from "react";
import useStore from "../../Hooks/Zustand/usersStore";
import openBoardsDetailIcon from "../../../assets/SVGs/faq-toggle-icon.svg"

export default function BoardsDisplaySection(props) {
  const [isClicked, setIsClicked] = useState(false);
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

  //setting toggling when clicked

    const handleToggle= ()=> {
         setIsClicked((prevState)=>!prevState)
    }

   const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)"
  };

 const openFaqDetailsStyle= {
        maxHeight: isClicked &&  "100%",
        marginTop: isClicked && '0.4rem',
        overflow: isClicked &&  'visible',
      }

  return (
    <form className="item eachBoardSection" name="main">
      <article className="label-article">
        <input
          onClick={checkboxRatioNotifier}
          type="checkbox"
          name="fruit"
          title="Check to select board"
          ref={checkboxRef}
          className="inputs board-checkbox"
          id={`check${props.indexNo}`}
        />

        <h5 onClick={handleToggle}  title="Show workspace" 
          id={`labelcheck${props.indexNo}`}>

          <p>{board.name} 
            <picture title="Show workspace" >
              <img style={rotateOnToggle} src={openBoardsDetailIcon} alt="show workspace icon" />
            </picture>
          </p>
          
        </h5>
      </article>
      <p style={openFaqDetailsStyle} className="workspaceName">{ isWorkspaceDetailsValid ? isWorkspaceDetailsValid.workspaceName: "Not under any workspace yet"}</p>
    </form>
  );
}
