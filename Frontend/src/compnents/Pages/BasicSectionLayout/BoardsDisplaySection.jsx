import { showCountsOfChecked } from "../../../JS functions/Utilis/EleDisplay";

export default function BoardsDisplaySection (props) {
  const handleCheckBoxClick = ()=> {
    showCountsOfChecked()
  }

  return (
          <form className="item" name="main">
                <article className='label-article'>
                  <input
                  onClick={handleCheckBoxClick }
                    type="checkbox"
                    name="fruit"
                    className="inputs board-checkbox"
                    id={`check${props.indexNo}`}
                  />
                  <label htmlFor={`check${props.indexNo}`} id={`labelcheck${props.indexNo}`}>
                    {props.board.name}
                  </label>
                </article>
          </form>
            );
};