import React from 'react'

import AddBtn from './AddBtn'

export default function SelectAll() {
  return (
       <section className='selectionCont' id="selective-btn">

        <h1>Select Boards To Add Member To</h1>
          <section className="selecting-btn-cont">
            <button id="select-all">Select All</button>
            <button id="clear-select">Deselect All</button>
          </section>

        < AddBtn/>
        
       </section>
  )
}
