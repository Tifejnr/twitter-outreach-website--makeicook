import { useState } from "react"


export default function successDetails(props) {
  const [isInnerListClicked, setIsInnerListClicked] = useState(false);
    
  const successObj=  props.successObj
  const successToggleIcon=  props.successToggleIcon
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
    <ul className='main-success-details-cont' style={openFaqDetailsStyle}>
      <p title="Click to see why" onClick={handleInnerListToggle} className='whatFailedCont'>   
        {successObj.failedMemberDetails} {proposition} {successObj.failedSectionName} <span className="failedSuffix">Failed</span>
      
      <img src={successToggleIcon} alt="togle icon" style={rotateOnToggle} />
 
     </p>
      <ul className='detailedReasonsCont' style={innerListToggleStyle}>
        <li><p><span className="reason">Reason:</span> {successObj.reason}</p></li>
      </ul>
    </ul>
  )
}
