import React from 'react'
import Input from './AddMember/Input'
import SearchBoards from './AddMember/SearchBoards'
import SelectAll from './AddMember/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'



export default function Compress() {
  return (
<>    
    <section className='main-section-cont'>
      <Input/>
      <SearchBoards/>   

       <section>
          <SelectAll/>
        </section>    
     </section>

     <ProgressBar/>


      {/* <div id="success"></div>
      <div id="sendin-progress2"></div>
      <div id="fetch-progress2"></div>
      <div id="sendin-progress"></div>

      <div id="email-error"></div>

      <div id="addmail-error"></div>
      <div id="addmail-error2"></div>
      <div id="service-error"></div>
      <div id="service-error2"></div>

     <nav id="sameline"></nav>  */}
 </>

  )
}


