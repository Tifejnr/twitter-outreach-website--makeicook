import { useState } from "react"


export default function FailureDetails(props) {

    const [isInnerListClicked, setIsInnerListClicked] = useState(false);


    const handleInnerListToggle= ()=> {
         setIsInnerListClicked((prevState)=>!prevState)
    }

   const rotateOnToggle = {
    transform: isInnerListClicked && "rotate(180deg)"
  };

 const innerListToggleStyle= {
        maxHeight: isInnerListClicked &&  "100%",
        // marginTop: isInnerListClicked && '1.2rem',
        overflow: isInnerListClicked &&  'visible',
      }


  const failureObj=  props.failureObj
  const failureToggleIcon=  props.failureToggleIcon
  return (
    <ul className='main-failure-details-cont'>
      <p onClick={handleInnerListToggle} className='whatFailedCont'>{failureObj.failedMemberDetails} to {failureObj.failedSectionName} Failed 
      
      <img src={failureToggleIcon} alt="togle icon" style={rotateOnToggle} />
      
      </p>
      <ul className='detailedReasonsCont' style={innerListToggleStyle}>
        <li><p>Reason: {failureObj.reason}</p></li>
      </ul>
    </ul>
  )
}
