import React, { useState,  useEffect } from 'react';
import Input from './AddMember/Input'
import SearchBoards from './AddMember/SearchBoards'
import SelectAll from './AddMember/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../JS functions/fetchData';



export default function Compress() {
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   FetchData()
  }, []);



  return (
<>    
    <section className='main-section-cont' id='mainContentCont'>
      <Input/>
      <SearchBoards/>   

       <section>
          <SelectAll/>
        </section>    
     </section>

     <ProgressBar/>

 </>

  )
}




