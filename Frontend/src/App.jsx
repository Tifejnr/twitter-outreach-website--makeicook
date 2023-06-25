import { useState } from 'react'
// import './App.css'
import './main.css'
import {Route, Routes} from "react-router-dom"
import Convert from '/root/Trello-Project-React/Frontend/src/compnents/Pages/Convert'
import Merge from '/root/Trello-Project-React/Frontend/src/compnents/Pages/Merge'
import Split from '/root/Trello-Project-React/Frontend/src/compnents/Pages/Split'
import Home from '/root/Trello-Project-React/Frontend/src/compnents/Pages/Home'
import AllPdf from '/root/Trello-Project-React/Frontend/src/compnents/Pages/AllPdf'
import NavContainer from '/root/Trello-Project-React/Frontend/src/compnents/Navbar/NavContainer'
import Delete from '/root/Trello-Project-React/Frontend/src/compnents/Pages/Delete'
import AddMember from '/root/Trello-Project-React/Frontend/src/compnents/Pages/AddMember'

function App() {

  return (
    <>
    <NavContainer/>

    <section>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-member' element={<AddMember/>}/>
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
