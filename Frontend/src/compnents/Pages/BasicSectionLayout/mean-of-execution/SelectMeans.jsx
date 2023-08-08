import { useState } from "react";
import toggleIcon from "../../../../assets/SVGs/faq-toggle-icon.svg"


export default function SelectMeans() {
const [isClicked, setIsClicked] = useState(false);
  
      // selectField.onclick = function () {
      //   list.classList.toggle("hide");
      //   arrowIcon.classList.toggle("rotate");
      // };
  return (
    <section className="meansofAdditionSection" id="meansofAdditionSection">
      <form action="" className="text-area-form" id="form">
        <div className="selector">
          <label>Select Means of Addition</label>
          
          <div id="selectField">
            <p id="selectText">Select Means of Addition</p>
            <span id="arrowIcon" className="arrow"
              ><div className="faq-item__arrow-container">
                <img
                  src={toggleIcon}
                  alt="arrow"
                  className="faq-item__arrow-icon" /></div></span>
          </div>

          <p id="selectReqError"></p>

          <ul id="list" className="hide">
            <li className="options"><p>Username</p></li>
            <li className="options"><p>Email</p></li>
            <li className="options"><p>Full name</p></li>
          </ul>
        </div>
      </form>
    </section> 
  )
}
