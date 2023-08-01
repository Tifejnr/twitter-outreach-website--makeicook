import React from 'react'


export default function FailureDetails(props) {

  const failureObj=  props.failureObj
  const failureToggleIcon=  props.failureToggleIcon
  return (
    <ul className='main-failure-details-cont'>
      <p className='whatFailedCont'>{failureObj.failedMemberDetails} to {failureObj.failedSectionName} Failed 
      
      <img src={failureToggleIcon} alt="togle icon" />
      
      </p>
      <ul className='detailedReasonsCont'>
        <li><p>Reason: {failureObj.reason}</p></li>
      </ul>
    </ul>
  )
}
