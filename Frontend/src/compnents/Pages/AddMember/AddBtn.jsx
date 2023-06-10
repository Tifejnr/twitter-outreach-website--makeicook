import IsBoxChecked from "../../../JS functions/isBoxChecked"

export default function AddBtn(props) {
  return (
     <div className='addMemberBtn'>
            <button id="deleting-btn" onClick={IsBoxChecked}>{props.labelTitle}</button>
            <div id="para"></div>
            <div
              id="email-error2"></div>
      </div>
  )
}
