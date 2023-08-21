import { useState } from "react";
import useStore from "../../../Hooks/Zustand/usersStore";
import toggleIcon from "../../../../assets/SVGs/faq-toggle-icon.svg"

const emailMeans = "Email";
const nameMeans= "Name"

const additionAction = "Addition";
const deletionAction = "Deletion"

export default function SelectMeans(props) {
const [isClicked, setIsClicked] = useState(false);
const setMeansOfExceution = useStore((state) => state.setMeansOfExceution);
const  meansOfExceution = useStore((state) => state.meansOfExceution);

const actionToBePerformed = props.actionToBePerformed;

    const handleToggle= ()=> {
      setIsClicked((prevState)=>!prevState)
    }

   const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)"
  };

  //open and closing list
 const openMeansAvailableStyle= {
        maxHeight: isClicked ? "100%" : null,
        marginTop: isClicked ? "0" : "-1rem",
        overflow: isClicked ?  'visible' : "hidden",
      }

  function storeMeansInStorage (meansChosen) {
 if (actionToBePerformed==additionAction) return  localStorage.setItem('meansChosenAddToBoards', meansChosen);
 if (actionToBePerformed==deletionAction) return  localStorage.setItem('meansChosenDeleteFromBoards', meansChosen);
 }

function handleEmailMeansSelection () {
  setMeansOfExceution(emailMeans)
  setIsClicked(false)
  storeMeansInStorage(emailMeans)
}

function handleNameMeansSelection () {
  setMeansOfExceution(nameMeans)
  setIsClicked(false)
  storeMeansInStorage(nameMeans)
}

  return (
    <section className="meansofAdditionSection" id="meansofAdditionSection">
      <form action="" className="text-area-form" id="form">
        <div className="selector">
          <label>Select Means of {actionToBePerformed}</label>

          <div id="selectField" onClick={handleToggle} title="Click to select preferred means">
            <p id="selectText">{meansOfExceution}</p>
            <span id="arrowIcon" className="arrow"
              ><div className="faq-item__arrow-container">
                <img
                style={rotateOnToggle}
                  src={toggleIcon}
                  alt="arrow"
                  className="faq-item__arrow-icon" /></div></span>
          </div>
          <p id="selectReqError"></p>

          <ul style={openMeansAvailableStyle}>
          { 
          actionToBePerformed == additionAction && <li className="options" onClick={handleEmailMeansSelection}><p>Email</p></li>
           }
            <li className="options" onClick={handleNameMeansSelection}><p>{nameMeans}</p></li>
          </ul>
        </div>

     </form>
    </section> 
  )
}
