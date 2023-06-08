import React from 'react'

import AddBtn from './AddBtn'
import CheckAll from '../../../JS functions/Selections.jsx/CheckAll'
import UncheckAll from '../../../JS functions/Selections.jsx/UncheckAll'

export default function SelectAll() {
  return (
       <section className='selectionCont' id="selective-btn">

        <h1>Select Boards To Add Member To</h1>
          <section className="selecting-btn-cont">
            <button id="select-all" onClick={CheckAll}>Select All</button>
            <button id="clear-select" onClick={UncheckAll}>Deselect All</button>
          </section>

        < AddBtn/>
        
       </section>
  )
}
