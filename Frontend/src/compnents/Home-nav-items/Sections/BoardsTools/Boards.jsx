import React from 'react'
import { Link } from 'react-router-dom'
import handlePageRefreshOnLoad from '../../../utilis/refreshPageOnLoad'

const addToBoardsLink="/add-member"
const deleteFromBoardsLink="/add-member"

export default function Boards() {
  return (
<section className='boards-actions-section'>

    <h2>Boards</h2>

     <ul>
        <Link to={addToBoardsLink} onClick={(e)=> {
          e.preventDefault();
          handlePageRefreshOnLoad(addToBoardsLink)
        }}> 
            <li>
               <p>Add team members to boards tool</p>
            </li>
        </Link>

        <Link to={deleteFromBoardsLink} onClick={(e)=> {
          e.preventDefault();
          handlePageRefreshOnLoad(deleteFromBoardsLink)
        }}>
          <li>
              <p>Delete team members from boards tool</p>
          </li>
        </Link>
     </ul>

  </section>
  )
}
