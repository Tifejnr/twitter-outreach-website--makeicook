export default function BoardsDisplaySection (props) {

  return (
          <form className="item" name="main">
                <article className='label-article'>
                  <input
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