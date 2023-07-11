import { useState,  createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import './main.css'
import './auth.css'
import {Link, Navigate, Route, Routes} from "react-router-dom"
import Convert from './compnents/Pages/Convert'
import Merge from './compnents/Pages/Merge'
import Split from './compnents/Pages/Split'
import Home from './compnents/Pages/Home'
import AllPdf from './compnents/Pages/AllPdf'
import NavContainer from './compnents/Navbar/HomePageNavItems'
import Delete from './compnents/Pages/Delete'
import AddMember from './compnents/Pages/AddMember'
import NavBarLandingPage from './compnents/LandingPage/Nav'
import Hero from './compnents/LandingPage/Body/Hero'
import Register from './compnents/Auth/Register/Register'
import SignIn from './compnents/Auth/SignIn/SignIn'
import AuthCombo from './compnents/Auth/AuthCombo'
import { display } from './JS functions/Utilis/EleDisplay'

export const LoginStatusContext =  createContext()


function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <LoginStatusContext.Provider value={[loggedIn, setLoggedIn]}>
    <>
   
    <AuthCombo  />
    {/* <NavBarLandingPage/>
    <Hero/> */}

    

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
    </LoginStatusContext.Provider>
  )

}


export default App
