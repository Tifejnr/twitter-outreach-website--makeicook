import { useState,  createContext } from 'react'
import './App.css'
import './main.css'
import './auth.css'
import './dashboard.css'
import './home.css'
import {Route, Routes} from "react-router-dom"
import Register from './compnents/Auth/Register/Register'
import SignIn from './compnents/Auth/SignIn/SignIn'
import AddMember from './compnents/Pages/AddMember'
import Delete from './compnents/Pages/Delete'
import Pricing from './compnents/Pages/Pricing'
import OauthPage from './compnents/Trello-oauth-page/OauthPage'
import LandingPage from './compnents/LandingPage/LandingPage'
import HomePage from './compnents/Home-nav-items/HomePage'
import Dashboard from './compnents/Auth/Dashboard/Dashboard'
import { MyProvider } from './compnents/Hooks/Contexts/UserContext'



function App() {
  return (
    <MyProvider>
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-member' element={<AddMember/>}/>
        <Route path='/delete-member' element={<Delete/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/authorize' element={<OauthPage />}/>
      </Routes>

    </>
    </MyProvider>
  )

}


export default App
