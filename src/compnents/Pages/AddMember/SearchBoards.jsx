import { searchInput } from "../../../JS functions/Utilis/SearchBar"

export default function SearchBoards() {
  return (
     <section className='searchSection'>
          <input 
          onKeyUp={searchInput}
            id="search"
            type="text"
            placeholder="Search Boards ..." />
     </section>
  )
}
