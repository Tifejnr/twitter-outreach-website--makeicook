import React from 'react'

export default function FailureDetails(props) {

  const failureObj=  props.failureObj
  return (
    <ul className='main-failure-details-cont'>
      <p>{failureObj.failedMemberDetails} Failed</p>
      <ul className='detailedReasonsCont'>
        <li><p>Reason: {failureObj.reason}</p></li>
        <li><p>Board: {failureObj.failedSectionName}</p></li>
      </ul>
    </ul>
  )
}
