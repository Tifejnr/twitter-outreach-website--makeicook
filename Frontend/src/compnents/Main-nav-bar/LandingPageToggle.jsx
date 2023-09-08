import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import ToggleLabel from './ToggleLabel'
import handlePageRefreshOnLoad from '../utilis/refreshPageOnLoad'

export default function LandingPageToggle(props) {

    // Define a state variable to keep track of the toggle state
  const [toggle, setToggle] = useState(true);

  // Function to handle the button click and toggle the state
  const handleClick = () => {
    setToggle((toggle)=>!toggle);
  };

  return (
    <>
     <input type="checkbox" id="nav__checkbox" className="nav__checkbox"  onChange={handleClick}/>
      <section className="mainNavIcons">
          {
          props.noCredits ? "" :
          
        <article className="myProfileIcon"> 
              <Link to={props.pageLink} onClick={(e)=> {
                      e.preventDefault()
                      handlePageRefreshOnLoad(props.pageLink)
                  }}>   
                    <button id="start-for-free-mobile-lp">
                      <p>{props.innerText}</p>
                    </button>
              </Link>

        </article>
         } 
        <ToggleLabel toggle={toggle}/>
      </section>
   </>
  )
}
