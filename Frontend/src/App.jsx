import { useState,  createContext } from 'react'
import './App.css'
import './main.css'
import './auth.css'
import {Route, Routes} from "react-router-dom"
import Register from './compnents/Auth/Register/Register'
import SignIn from './compnents/Auth/SignIn/SignIn'
import AddMember from './compnents/Pages/AddMember'
import Delete from './compnents/Pages/Delete'
import Pricing from './compnents/Pages/Pricing'
import OauthPage from './compnents/Trello-oauth-page/OauthPage'
import LandingPage from './compnents/LandingPage/LandingPage'
import HomePage from './compnents/Home-nav-items/HomePage'
import LoggedInUsersControl from './compnents/Controllers/LoggedInUsersControl'

export const LoginStatusContext =  createContext()


function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <LoginStatusContext.Provider value={[loggedIn, setLoggedIn]}>
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/add-member' element={<AddMember/>}/>
        <Route path='/delete-member' element={<Delete/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/authorize' element={<OauthPage />}/>
      </Routes>

    </>
    </LoginStatusContext.Provider>
  )

}


export default App
