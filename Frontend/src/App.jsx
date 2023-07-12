import { useState,  createContext } from 'react'
import './App.css'
import './main.css'
import './auth.css'
import {Route, Routes} from "react-router-dom"
import MainNav from './compnents/Main-nav-bar/MainNav'
import Register from './compnents/Auth/Register/Register'
import SignIn from './compnents/Auth/SignIn/SignIn'
import AddMember from './compnents/Pages/AddMember'
import Delete from './compnents/Pages/Delete'
import Pricing from './compnents/Pages/Pricing'

export const LoginStatusContext =  createContext()


function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <LoginStatusContext.Provider value={[loggedIn, setLoggedIn]}>
    <>
      <Routes>
        <Route path='/' element={<MainNav/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/add-member' element={<AddMember/>}/>
        <Route path='/delete-member' element={<Delete/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
      </Routes>

    </>
    </LoginStatusContext.Provider>
  )

}


export default App
