import React from 'react'

import AddBtn from './AddBtn'
import CheckAll from '../../../JS functions/Utilis/Selections.jsx/CheckAll'
import UncheckAll from '../../../JS functions/Utilis/Selections.jsx/UncheckAll'

export default function SelectAll(props) {
  return (
       <section className='selectionCont' id="selective-btn">

        <h1>{props.selectInstructionText}</h1>
          <section className="selecting-btn-cont">
            <button id="select-all" onClick={CheckAll}>Select All</button>
            <button id="clear-select" onClick={UncheckAll}>Deselect All</button>
          </section>

        < AddBtn labelTitle={props.labelTitle}/>
        
       </section>
  )
}
