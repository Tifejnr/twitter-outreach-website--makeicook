import { useState } from 'react'
import './App.css'
import './main.css'
import {Route, Routes} from "react-router-dom"
import Convert from './compnents/Pages/Convert'
import Merge from './compnents/Pages/Merge'
import Split from './compnents/Pages/Split'
import Home from './compnents/Pages/Home'
import AllPdf from './compnents/Pages/AllPdf'
import NavContainer from './compnents/Navbar/NavContainer'
import Delete from './compnents/Pages/Delete'
import AddMember from './compnents/Pages/AddMember'
import NavBarLandingPage from './compnents/LandingPage/Nav'
import Hero from './compnents/LandingPage/Body/Hero'


function App() {

  return (
    <>
    <NavContainer/>
    {/* <Hero/> */}

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
    <p id='para'></p>
    <section> 
    </section> 
    </>
  )
 
}

export default App
