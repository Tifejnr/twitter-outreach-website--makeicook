import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../../../../Trello-Project-React/Frontend/src/JS functions/FetchData';
import AddToBoard from '../../JS functions/AddToBoard';
import HomePage from '../Home-nav-items/HomePage';
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl';



const labelTitle = "Add Member";
const inputLabel = "Member Email:";
const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Add Member to";
const inputPlaceholderText = "Enter Email";
const pageName = "add-member";
const pageTitle = "Add Member Via Email";


export default function AddMember() {

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

