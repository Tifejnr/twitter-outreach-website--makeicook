import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../../../../Trello-Project-React/Frontend/src/JS functions/FetchData';
import AddToBoard from '../../../../../Trello-Project-React/Frontend/src/JS functions/AddToBoard';


export default function AddMember() {
useEffect(() => {
FetchData()

  }, []);

  const labelTitle = "Add Member"
  const inputLabel= "Member Email:"
  const searchPlaceholderTitle= "Search Boards ..."
  const selectInstructionText= "Select Boards for Member Addition"
  const inputPlaceholderText= "Enter Email"
  const pageName = "add-member"

  return (
<>    
    <section className='main-section-cont' id='mainContentCont'>

      <section className='inner-main-cont' id='innerMainContentCont'>
        <Input inputLabel={inputLabel} inputPlaceholderText={inputPlaceholderText}/>  

          <SelectAll 
          labelTitle={labelTitle} 
          selectInstructionText={selectInstructionText} 
           action={ (e)=> {
            e.preventDefault()
            AddToBoard()
          } }
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle}/> 
         </section>    
      
     </section>

    <ProgressBar pageName={pageName}/>

 </>

  )
}




