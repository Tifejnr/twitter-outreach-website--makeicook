import React, { useState,  useEffect, useContext } from 'react';
import { MyContext } from '../Hooks/Contexts/UserContext';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import DeleteMemberFromBoard from '../../../../../Trello-Project-React/Frontend/src/JS functions/DeleteFromBoard';
import HomePage from '../Home-nav-items/HomePage';
import LoggedInUsersControl from '../Controllers/OnlyAuthorizedUsers';
import BoardsDisplaySection from './BasicSectionLayout/BoardsDisplaySection';
import { websiteUrl } from '../../JS functions/websiteUrl';


const labelTitle = "Delete Member";
const inputLabel = "Trello Username:";
const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards To Delete Member";
const inputPlaceholderText = "@...";
const pageName = "delete-member";
const pageTitle = "Delete Member Via Username";


export default function Delete() {
  const [boardsCollection, setBoardsCollection] = useState([]);
  const { textAreaValue, setc, textAreaRefEl, setd } = useContext(MyContext);

useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        const url = `${websiteUrl}/start`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ true: true }),
          signal: abortController.signal, // Pass the signal to the fetch call
        });

        const dataRaw = await response.json();

        if (!dataRaw) {
          console.log("No data seen");
          return;
        }

        if (dataRaw.error) {
          if (dataRaw.error.code === "ENOTFOUND") {
            console.log("No internet network");
            return;
          }
        }

        const data = dataRaw.boardsCollection;
        setBoardsCollection(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  useEffect(() => {

  }, [boardsCollection]);

return (
<>    
<LoggedInUsersControl>
   <HomePage/>   
    <section className='main-section-cont' id='mainContentCont'>

      
      <h1>{pageTitle}</h1>

      <section className='inner-main-cont' id='innerMainContentCont'>
        <Input inputLabel={inputLabel} inputPlaceholderText={inputPlaceholderText}/>

          <SelectAll 
          labelTitle={labelTitle} 
          selectInstructionText={selectInstructionText}
          action={ (e)=> {
            e.preventDefault()
            const executionParams= {
              boardsCollection,
              textAreaValue,
              textAreaRefEl
            }

            DeleteMemberFromBoard(executionParams)
          } }
          />

        <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle}/>   

         {boards.map((board, index) => {
           return  ( <BoardsDisplaySection key={index} board={board} indexNo={index}/>)
         })}

      </section>
      
     </section>

    <ProgressBar pageName={pageName}/>
    
</LoggedInUsersControl>
 </>

  )
}




