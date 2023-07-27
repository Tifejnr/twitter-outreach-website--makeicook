import React from 'react'
import logoutIcon from "../../../../assets/SVGs/logout.svg"

export default function Logout() {
  return (
   <section
        className="logoutContainer"
        // onClick={async (e) => {
        //   e.preventDefault(await trial());
        // }}
        
        >
        <button htmlFor="/logout" className="logoutLink">
          <picture className="logoutIcon" title="Logout">
            <img src={logoutIcon} alt="logout icon" />
          </picture>
          <h3>Logout</h3>
        </button>
      </section>
  )
}
