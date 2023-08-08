import { searchInput } from "../../../JS functions/Utilis/SearchBar"

export default function SearchBoards(props) {
  return (
     <section className='searchSection'>
          <input 
          onKeyUp={searchInput}
            id="search"
            type="text"
            placeholder={props.searchPlaceholderTitle} />
            
     </section>
  )
}
