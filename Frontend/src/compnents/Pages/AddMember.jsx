import React, { useState,  useEffect } from 'react';
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
  const [boards, setBoards] = useState([]);

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
        setBoards(data);
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

  }, [boards]);

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
            e.preventDefault();
            AddToBoard()
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






//setting ele instead of getting by id


// const MyComponent = () => {
//   const [myElement, setMyElement] = useState(null);

//   const handleClick = () => {
//     console.log(myElement);
//     // Perform operations on the element
//   };

//   return (
//     <div>
//       <div ref={setMyElement}>This is my element</div>
//       <button onClick={handleClick}>Get Element</button>
//     </div>
//   );
// };


//when it's not within the comp


// const MyComponent = () => {
//   const [myElement, setMyElement] = useState(null);

//   useEffect(() => {
//     const element = document.getElementById('myElement');
//     setMyElement(element);
//   }, []);

//   const handleClick = () => {
//     console.log(myElement);
//     // Perform operations on the element
//   };

//   return (
//     <div>
//       {/* Your component content */}
//       <button onClick={handleClick}>Get Element</button>
//     </div>
//   );
// };

