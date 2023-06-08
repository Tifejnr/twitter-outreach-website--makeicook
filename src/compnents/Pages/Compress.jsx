import React, { useState,  useEffect } from 'react';
import Input from './AddMember/Input'
import SearchBoards from './AddMember/SearchBoards'
import SelectAll from './AddMember/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../JS functions/fetchData';



export default function Compress() {

  useEffect(() => {
async function fetchDataAndProcess() {
  try {
    const idCollections = await FetchData();
    // Access the idCollections array here
    console.log(idCollections);

    return idCollections
    
    // Continue with further processing or actions
    // ...
  } catch (error) {
    console.log(error);
  }
}

fetchDataAndProcess();

  }, []);

  return (
<>    
    <section className='main-section-cont' id='mainContentCont'>

      <section className='inner-main-cont' id='innerMainContentCont'>
        <Input/>
         <SearchBoards/>   

         <section>
          <SelectAll/>
         </section>    
      </section>
      
     </section>

    <ProgressBar/>

 </>

  )
}




