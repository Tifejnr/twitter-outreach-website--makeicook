import React from 'react'

import AddBtn from './AddBtn'

export default function SelectAll() {
  return (
       <section id="selective-btn">
          <section className="selecting-btn-cont">
            <button id="select-all">Select All</button>
            <button id="clear-select">Deselect All</button>
          </section>

        < AddBtn/>

        
        <h1 id="signin">Select Boards To Add Member To</h1>
        
       </section>
  )
}
