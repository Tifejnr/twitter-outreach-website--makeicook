import { useState } from "react";
import useStore from "../../../Hooks/Zustand/usersStore";
import toggleIcon from "../../../../assets/SVGs/faq-toggle-icon.svg"

const emailMeans = "Email";
const usernameMeans= "Username"
const fullNameMeans= "Fullname"

export default function SelectMeans() {
const [isClicked, setIsClicked] = useState(false);
const [selectLabel, setSelectLabel] = useState("Select Means of Addition");
const setMeansOfExceution = useStore((state) => state.setMeansOfExceution);

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

  function storeMeansInStorage (meansChosenAddToBoards) {
    localStorage.setItem('meansChosenAddToBoards', meansChosenAddToBoards);
 }

function handleEmailMeansSelection () {
  setMeansOfExceution(emailMeans)
  setIsClicked(false)
  setSelectLabel(emailMeans)
  storeMeansInStorage(emailMeans)
}

function handleUsernameMeansSelection () {
  setMeansOfExceution(usernameMeans)
  setIsClicked(false)
  setSelectLabel(usernameMeans)
  storeMeansInStorage(usernameMeans)
}

function handleFullnameMeansSelection () {
   setMeansOfExceution(fullNameMeans)
   setIsClicked(false)
   setSelectLabel(fullNameMeans)
   storeMeansInStorage(fullNameMeans)

}

  return (
    <section className="meansofAdditionSection" id="meansofAdditionSection">
      <form action="" className="text-area-form" id="form">
        <div className="selector">
          <label>Select Means of Addition</label>

          <div id="selectField" onClick={handleToggle} title="Click to select preferred means of addition">
            <p id="selectText">{selectLabel}</p>
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
            <li className="options" onClick={handleEmailMeansSelection}><p>Email</p></li>
            <li className="options" onClick={handleUsernameMeansSelection}><p>Username</p></li>
            <li className="options" onClick={handleFullnameMeansSelection}><p>Full name</p></li>
          </ul>
        </div>
      </form>
    </section> 
  )
}
