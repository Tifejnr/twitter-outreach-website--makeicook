import React, { useState,  useEffect } from 'react';
import Input from './AddMember/Input'
import SearchBoards from './AddMember/SearchBoards'
import SelectAll from './AddMember/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../JS functions/fetchData';
import AddToBoard from '../../JS functions/AddToBoard';

export default function Compress() {
useEffect(() => {
FetchData()

  }, []);

  const labelTitle = "Add Member"
  const inputLabel= "Trello Name:"
  const searchPlaceholderTitle= "Search Boards ..."
  const selectInstructionText= "Select Boards To Add Member To"
  const inputPlaceholderText= "Enter Email"

  return (
<>    
    <section className='main-section-cont' id='mainContentCont'>

      <section className='inner-main-cont' id='innerMainContentCont'>
        <Input inputLabel={inputLabel} inputPlaceholderText={inputPlaceholderText}/>
         <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle}/>   

         <section>
          <SelectAll 
          labelTitle={labelTitle} 
          selectInstructionText={selectInstructionText} 
          action={AddToBoard}
          />
         </section>    
      </section>
      
     </section>

    <ProgressBar/>

 </>

  )
}




