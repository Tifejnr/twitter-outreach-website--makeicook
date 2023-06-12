import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../JS functions/fetchData';
import DeleteMemberFromBoard from '../../JS functions/Delete';


export default function Delete() {
useEffect(() => {
FetchData()

  }, []);

  const labelTitle = "Delete Member"
  const inputLabel= "Trello Username:"
  const searchPlaceholderTitle= "Search Boards ..."
  const selectInstructionText= "Select Boards To Delete Member"
   const inputPlaceholderText= "@..."
   const pageName= "delete-member"

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
          action={ (e)=> {
            e.preventDefault()
            DeleteMemberFromBoard()
          } }
          />
         </section>    
      </section>
      
     </section>

    <ProgressBar pageName={pageName}/>

 </>

  )
}




