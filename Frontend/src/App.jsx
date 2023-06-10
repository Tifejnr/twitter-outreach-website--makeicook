import { useState } from 'react'
// import './App.css'
import './main.css'
import {Route, Routes} from "react-router-dom"
import Compress from './compnents/Pages/Compress'
import Convert from './compnents/Pages/Convert'
import Merge from './compnents/Pages/Merge'
import Split from './compnents/Pages/Split'
import Home from './compnents/Pages/Home'
import AllPdf from './compnents/Pages/AllPdf'
import NavContainer from './compnents/Navbar/NavContainer'
import Delete from './compnents/Pages/Delete'

function App() {

  return (
    <>
    <NavContainer/>

    <section>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Compress' element={<Compress/>}/>
        <Route path='/Convert' element={<Convert/>}/>
        <Route path='/Merge' element={<Merge/>}/>
        <Route path='/Split' element={<Split/>}/>
        <Route path='/AllPdf' element={<AllPdf/>}/>
        <Route path='/delete-member' element={<Delete/>}/>
      </Routes>
    </section>
      
    <section>



    </section>
    </>
  )
 
}

export default App
