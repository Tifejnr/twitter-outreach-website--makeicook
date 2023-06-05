import React from 'react'

export default function Compress() {
  return (
     <main id="mainContentCont">
      <header id="headersHide">
        <div id="member-name">
          <form id="survey-form">
            <label
              >Trello-name:
              <input
              className='inputValue'
                type="text"
                id="resultoo"
                placeholder="Enter Email"
               />
            </label>
          </form>
        </div>
        <h1 id="signin">Select Boards To Add Member To</h1>

        <section className='searchSection'>
          <input
            id="search"
            type="text"
            placeholder="Search Boards ..." />
        </section>

        <section id="selective-btn">
          <section className="selecting-btn-cont">
            <button id="select-all">Select All</button>
            <button id="clear-select">Deselect All</button>
          </section>

          <div style="margin-top: 8px; margin-bottom: 10px">
            <button id="deleting-btn">Add Member</button>
            <div id="para"></div>
            <div
              id="email-error2"></div>
          </div>
        </section>
      </header>

      <div id="success"></div>
      <div id="sendin-progress2"></div>
      <div id="fetch-progress2"></div>
      <div id="sendin-progress"></div>

      <div id="email-error"></div>

      <div id="addmail-error"></div>
      <div id="addmail-error2"></div>
      <div id="service-error"></div>
      <div id="service-error2"></div>

     <nav id="sameline"></nav> 
    </main>
  )
}
