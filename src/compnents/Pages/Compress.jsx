import React from 'react'

export default function Compress() {
  return (
     <main id="mainContentCont" class="main">
      <header id="headersHide">
        <div id="member-name">
          <form id="survey-form">
            <label
              >Trello-name:
              <input
                type="text"
                id="resultoo"
                size="18px"
                placeholder="Enter Email"
                style="
                  height: 20px;
                  font-size: 17px;
                  border: 1px solid #9397e0;
                  border-radius: 6px;
                  padding: 0px 12px;
                  outline: none;
                " />
            </label>
          </form>
        </div>
        <h1 id="signin">Select Boards To Add Member To</h1>

        <section style="position: relative; margin-top: 5px; margin-left: 23px">
          <input
            id="search"
            type="text"
            placeholder="Search Boards ..."
            style="
              height: 20px;
              font-size: 16px;
              border: 1px solid #1c2061;
              border-radius: 6px;
              width: 320px;
              padding: 0px 12px;
              outline: none;
            " />
        </section>

        <section id="selective-btn">
          <section class="selecting-btn-cont">
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
