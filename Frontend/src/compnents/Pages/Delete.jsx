import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../../../../Trello-Project-React/Frontend/src/JS functions/FetchData';
import DeleteMemberFromBoard from '../../../../../Trello-Project-React/Frontend/src/JS functions/DeleteFromBoard';
import HomePage from '../Home-nav-items/HomePage';
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl';

export default function Delete() {
  const [labelTitle, setLabelTitle] = useState("Delete Member");
  const [inputLabel, setInputLabel] = useState("Trello Username:");
  const [searchPlaceholderTitle, setSearchPlaceholderTitle] = useState("Search Boards ...");
  const [selectInstructionText, setSelectInstructionText] = useState("Select Boards To Delete Member");
  const [inputPlaceholderText, setInputPlaceholderText] = useState("@...");
  const [pageName, setPageName] = useState("delete-member");
  const [pageTitle, setPageTitle] = useState("Delete Member Via Username");

useEffect(() => {
FetchData()

  }, []);


return (
<>    
<LoggedInUsersControl>
   <HomePage/>   
    <section className='main-section-cont' id='mainContentCont'>

      
      <h1>{pageTitle}</h1>

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
    
</LoggedInUsersControl>
 </>

  )
}




