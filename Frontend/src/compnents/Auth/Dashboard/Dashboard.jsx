import React from 'react'
import goBackIcon from "../../../assets/SVGs/goBack.svg"
import DashBody from './DashBody'
import NavLogo from '../../Main-nav-bar/NavLogo'
import AuthFooter from '../AuthFooter'

export default function Dashboard() {
  const buttonClick = ()=> {
 async function postData() {
    const url = "https://www.collabfortrello.com/api/sign-in";
    const data = {
      imado: "JGuners",
      lakaka: "johndoe@example.com",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  postData();
  }


  const postData2= ()=> {
    async function postData() {
    const url = `https://workforreputation.com/api/auth`;
    const data = {
      name: "John Doe",
      email: "johndoe@example.com",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  postData();
  }
  return (
    <>
  <nav className='nav'>
       <label for="nav__checkbox" class="nav__toggle">
          <picture className="cartIcon" id="goBackIcon" title="Go Back">
            <img src={goBackIcon} alt="go back icon"
          /></picture>
        </label>

      <ul className="nav__menu">

        <li>
          <NavLogo />
        </li>

      </ul>
  </nav> 

  <DashBody />

  <button onClick={buttonClick}>button click me</button>
  <button onClick={postData2}>post to wfr</button>

  <AuthFooter/>
    </>
  )
}
