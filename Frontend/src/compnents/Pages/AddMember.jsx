import React, { useState,  useEffect, useContext, } from 'react';
import { MyContext } from '../Hooks/Contexts/UserContext';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import AddToBoard from '../../JS functions/AddToBoard';
import HomePage from '../Home-nav-items/HomePage';
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl';
import BoardsDisplaySection from './BasicSectionLayout/BoardsDisplaySection';
import { websiteUrl } from '../../JS functions/websiteUrl';



const labelTitle = "Add Members";
const inputLabel = "Members' Emails:";
const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Add Members to";
const inputPlaceholderText = "Input emails of members to be added, each separated with a comma.";
const pageName = "add-member";
const pageTitle = "Add Members Via Email";




export default function AddMember() {
  const [boardsCollection, setBoardsCollection] = useState([]);
  const [execute, setExecute] = useState(false);
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

        const data = dataRaw.boards;
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


  if (boardsCollection=== undefined) return console.log("boards not available")

  return (
<>   
<LoggedInUsersControl>
   <HomePage/> 
   

  { execute ?  <ProgressBar pageName={pageName}/> : 
  
   <section className='main-section-cont' id='mainContentCont'>

      <h1>{pageTitle}</h1>

      <section className='inner-main-cont' id='innerMainContentCont'>

        <Input inputLabel={inputLabel} inputPlaceholderText={inputPlaceholderText}/>
          <SelectAll 
          labelTitle={labelTitle} 
          selectInstructionText={selectInstructionText} 
           action={ (e)=> {
            e.preventDefault();

            setExecute(true)
            const executionParams= {
              boardsCollection,
              textAreaValue,
              textAreaRefEl
            }
            AddToBoard(executionParams)
          } }
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle}/> 
          
         {boardsCollection.map((board, index) => {
          return  ( <BoardsDisplaySection key={index} board={board} indexNo={index}/>)
         })}

         </section>    
      
     </section>
  }
    
</LoggedInUsersControl>
 </>

  )
}




