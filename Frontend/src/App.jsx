import './App.css'
import './main.css'
import './auth.css'
import './dashboard.css'
import './select-means.css'
import "./contactPage.css"

import {Route, Routes} from "react-router-dom"
import ReactGA from "react-ga4";
import Register from './compnents/Auth/Register/Register'
import SignIn from './compnents/Auth/SignIn/SignIn'
import AddMember from './compnents/Pages/AddMember'
import DeleteMemberBoards from './compnents/Pages/DeleteMemberBoards'
import Pricing from './compnents/Pages/Pricing'
import OauthPage from './compnents/Trello-oauth-page/OauthPage'
import LandingPage from './compnents/LandingPage/LandingPage'
import HomePage from './compnents/Home-nav-items/HomePage'
import Dashboard from './compnents/Auth/Dashboard/Dashboard'
import MainContactPage from './compnents/Pages/Contact-us-page/MainContactPage'
import AboutUsPage from './compnents/Pages/About-us-page/AboutUs'
import TermsOfUsePage from './compnents/Pages/Terms-and-privacy/TermsOfUsePage'
import PrivacyPolicyPage from './compnents/Pages/Terms-and-privacy/privacyPolicy'
import MainForgotPasswordPage from './compnents/Pages/ForgotPassword/MainForgotPasswordPage'
import ResetPasswordPage from './compnents/Pages/ForgotPassword/ResetPassword/ResetPasswordPage'
import OnlyAuthorizedUsers from './compnents/Controllers/OnlyAuthorizedUsers'
import CFTIconHosted from './compnents/HostedIcon/CFTIconHosted'


const trackingId = "G-67WKHKMDEH";

ReactGA.initialize(trackingId);


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<OnlyAuthorizedUsers><HomePage/></OnlyAuthorizedUsers>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<OnlyAuthorizedUsers><Dashboard/></OnlyAuthorizedUsers>}/>
        <Route path='/add-member' element={<OnlyAuthorizedUsers><AddMember/></OnlyAuthorizedUsers>}/>
        <Route path='/delete-member' element={<OnlyAuthorizedUsers><DeleteMemberBoards/></OnlyAuthorizedUsers>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/authorize' element={<OauthPage/>}/>
        <Route path='/contact-us' element={<MainContactPage/>}/>
        <Route path='/about-us' element={<AboutUsPage/>}/>
        <Route path='/terms' element={<TermsOfUsePage/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
        <Route path='/forgot-password' element={<MainForgotPasswordPage/>}/>
        <Route path='/reset-password' element={<ResetPasswordPage/>}/>
        <Route path='/cft-auth-icon' element={<CFTIconHosted/>}/>
      </Routes>

    </>
  )

}


export default App
