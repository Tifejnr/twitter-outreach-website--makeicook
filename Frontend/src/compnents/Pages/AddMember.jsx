import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../../../../Trello-Project-React/Frontend/src/JS functions/FetchData';
import AddToBoard from '../../JS functions/AddToBoard';
import HomePage from '../Home-nav-items/HomePage';
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl';


export default function AddMember() {
  const [labelTitle, setLabelTitle] = useState("Add Member");
  const [inputLabel, setInputLabel] = useState("Member Email:");
  const [searchPlaceholderTitle, setSearchPlaceholderTitle] = useState("Search Boards ...");
  const [selectInstructionText, setSelectInstructionText] = useState("Select Boards to Add Member to");
  const [inputPlaceholderText, setInputPlaceholderText] = useState("Enter Email");
  const [pageName, setPageName] = useState("add-member");
  const [pageTitle, setPageTitle] = useState("Add Member Via Email");

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

