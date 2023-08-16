import { useState } from "react"


export default function FailureDetails(props) {
  const [isInnerListClicked, setIsInnerListClicked] = useState(false);
    
  const failureObj=  props.failureObj
  const failureToggleIcon=  props.failureToggleIcon
  const isClicked=  props.isClicked
  const proposition=  props.proposition


  const handleInnerListToggle= ()=> {
      setIsInnerListClicked((prevState)=>!prevState)
   }

   const rotateOnToggle = {
    transform: isInnerListClicked && "rotate(180deg)"
  };

 const openFaqDetailsStyle= {
        maxHeight: isClicked &&  "100%",
        overflow: isClicked &&  'visible',
      }

 const innerListToggleStyle= {
        maxHeight: isInnerListClicked &&  "100%",
        overflow: isInnerListClicked &&  'visible',
      }


  return (
    <ul className='main-failure-details-cont' style={openFaqDetailsStyle}>
      <p title="Click to see why" onClick={handleInnerListToggle} className='whatFailedCont'>   
        {failureObj.failedMemberDetails} {proposition} {failureObj.failedSectionName} <span className="failedSuffix">Failed</span>
      
      <img src={failureToggleIcon} alt="togle icon" style={rotateOnToggle} />
 
     </p>
      <ul className='detailedReasonsCont' style={innerListToggleStyle}>
        <li><p><span className="reason">Reason:</span> {failureObj.reason}</p></li>
      </ul>
    </ul>
  )
}
