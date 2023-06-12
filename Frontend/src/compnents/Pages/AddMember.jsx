import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../JS functions/fetchData';
import AddToBoard from '../../JS functions/AddToBoard';

export default function AddMember() {
useEffect(() => {
FetchData()

  }, []);

  const labelTitle = "Add Member"
  const inputLabel= "Trello Name:"
  const searchPlaceholderTitle= "Search Boards ..."
  const selectInstructionText= "Select Boards To Add Member To"
  const inputPlaceholderText= "Enter Email"
  const pageName = "add-member"

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
            AddToBoard()
          } }
          />
         </section>    
      </section>
      
     </section>

    <ProgressBar pageName={pageName}/>

 </>

  )
}




