import React , {useContext} from 'react'
import { Link, useMatch, useResolvedPath,Navigate, Route, Routes} from "react-router-dom"
import letterC from "../../assets/SVGs/letter-c.svg"
import letterF from "../../assets/SVGs/letter-f.svg"
import letterT from "../../assets/SVGs/letter-t.svg"
import getCookie from '../../JS functions/Auth/cookie-handling/get-cookie'
import AddMember from '../Pages/AddMember'
import Delete from '../Pages/Delete'


export default function NavItemsLandingPage() {
  return (
      <>
      <input type="checkbox" id="nav__checkbox" className="nav__checkbox" />
      <section className="mainNavIcons">
     
        <label htmlFor="nav__checkbox" className="nav__toggle" title="Menu">
          <svg className="menu" viewBox="0 0 448 512" width="100" title="bars">
            <path
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
          <svg className="close" viewBox="0 0 384 512" width="100" title="times">
            <path
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
          </svg>
        </label>
      </section>

      <ul className="nav__menu">
        <li>
          <section className="logo-container">
            <section className="logoIconsContainer">
              <picture className='logo-icon'>
                <img src={letterC} alt="" />
              </picture>
              <picture className="logo-icon letter-f">
                <img src={letterF} alt="" />
              </picture>
              <picture className="logo-icon letter-t">
                <img src={letterT} alt="" />
              </picture>
            </section>
            <h2 className="logo-title">Collab for Trello</h2>
          </section>
        </li>

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
      </ul>
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


