import React, {useState} from 'react'
import CheckAll from '../../../JS functions/Utilis/Selections.jsx/CheckAll'
import UncheckAll from '../../../JS functions/Utilis/Selections.jsx/UncheckAll'

export default function SelectAll(props) {
  const [isAllChecked, setIsAllChecked] =  useState(false)
  return (
       <section className='selectionCont' id="selective-btn">

          <h1>{props.selectInstructionText}</h1>
          <section className="selecting-btn-cont"> 
          {
            isAllChecked ? <button id="clear-select" onClick={()=>{

              UncheckAll()
              setIsAllChecked(false)

            }}>Deselect All</button> :

            <button id="select-all" onClick={()=> {
                    CheckAll()
                    setIsAllChecked(true)
             } }
           >Select All</button>
          }

             <button className="execution-btn" id="deleting-btn" onClick={props.action}>{props.labelTitle}</button>
          </section>
        
       </section>
  )
}
