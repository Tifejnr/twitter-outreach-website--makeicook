import { useState,  createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import './main.css'
import './auth.css'
import {Link, Navigate, Route, Routes} from "react-router-dom"
import MainNav from './compnents/LandingPage/MainNav'
import Hero from './compnents/LandingPage/Body/Hero'
import Register from './compnents/Auth/Register/Register'
import SignIn from './compnents/Auth/SignIn/SignIn'

export const LoginStatusContext =  createContext()


function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <LoginStatusContext.Provider value={[loggedIn, setLoggedIn]}>
    <>
    {/* <AuthCombo  /> */}
    {/* <NavBarLandingPage/>
    <Hero/> */}

      <Routes>
        <Route path='/' element={<MainNav/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>

    </>
    </LoginStatusContext.Provider>
  )

}


export default App
