import React , {useContext} from 'react'
import { Link, useMatch, useResolvedPath,Navigate, Route, Routes} from "react-router-dom"
import getCookie from '../../JS functions/Auth/cookie-handling/get-cookie'
import AddMember from '../Pages/AddMember'
import Delete from '../Pages/Delete'




export default function NavItemsLandingPage() {
  return (
      <>
      <li className="nav-list">
         <h3 className="features">Features</h3>
      </li>
        <li className="nav-list">
          <h3 className="pricing">Pricing</h3>
        </li>
        <li className="nav-list">
         <h3 className="faq">FAQ</h3>
        </li>
        <li className="nav-list">
            <h3 className="reviews">Reviews</h3>
        </li>

        <li className="nav-list">
        <h3 className="reviews">Get Started</h3> 
        </li>
</>
)
}


//Nav program that is active function
const CustomLink= ({to, children, ...props}) => {
 const resolvedPath = useResolvedPath(to);

 const isActive =  useMatch({path: resolvedPath.pathname, end:true})

 return (
  <li className={isActive && "active"}>
    <Link to={to} {...props}>
      {children}
    </Link>

  </li>
 )
}



function NavMenuControllers () {
  return (
     <Routes>
      <Route  path='/' element={<LandingPageLogic> <NavBarLandingPage/></LandingPageLogic>}></Route>
      <Route  path='/register' element={<RegisterPageLogic> <Register/></RegisterPageLogic>}></Route>
      <Route path='/sign-in' element={<SignInPageLogic> <SignIn/></SignInPageLogic>}></Route>
      <Route path='/wrong' element={<WrongPageLogic> <div>Page Not Available</div></WrongPageLogic>}></Route>
   </Routes>
  )
}


function RegisterPageLogic ({children}) {
 return(<> {children} </>) 

}

function SignInPageLogic ({children}) {
 return(<> {children} </>) 
}


function LandingPageLogic ({children}) {
  const [isLoggedIn, setLoggedStatus ]= useContext(LoginStatusContext);

  if (isLoggedIn) return( <>{children}</>) 

  return (<Navigate replace to={"/wrong"}/>);

}

function WrongPageLogic({children}) {
  return( <>{children}</>)
}


