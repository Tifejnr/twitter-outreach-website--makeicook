import React,  { useEffect } from 'react'
import HomeNavBar from './HomeNavBar'
import useStore from '../Hooks/Zustand/usersStore'
import Boards from './Sections/BoardsTools/Boards'
import Workspaces from './Sections/Workspaces/Workspaces'


export default function HomePage() {
  const creditsFromServer = useStore((state) => state.creditsFromServer)

  return (
<>
  <HomeNavBar innerText={creditsFromServer==1 ? `Credit:${creditsFromServer}`: 
      
 `Credits:${creditsFromServer}`} pagelink="#" 
  />

  <main className='home-main-cont'>
    <h2>Select tool that matches the action you want to execute:</h2>
    <Boards/>
    <Workspaces/>
  </main>
</>
  )
}
