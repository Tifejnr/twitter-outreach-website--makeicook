import React, {useEffect, useState} from 'react'

export default function ProgressBar(props) {
  const [isPageLoad, setIsPageLoad]= useState()

  useEffect(() => {
  setIsPageLoad(true)

  }, [])


  if (isPageLoad === undefined) return "";
  
  return (
      <div className="loading" id="loading">
      <div className="barHolder">
        <div id="bar"></div>
      </div>
      <h2 id="progressBarTitle" className="title" ></h2>
      <h3 id="successStatusTitle" className="title"></h3>
      <h3 id="failureTitle" className="title failureTitle"></h3>
      <h3 id="completedStatus" className="title"></h3>
      <section className="btn-section" id="btnSection">
        <a href={`/${props.pageName}`}> <button className="okay-btn" id="okay">Okay</button></a>
        <a href={`/${props.pageName}`}>
          <button className="cancel-btn" id="cancelBtn">Cancel</button>
        </a>
      </section>
    </div>

  )
}
