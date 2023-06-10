
export default function AddBtn(props) {
  return (
     <div className='addMemberBtn'>
            <button id="deleting-btn" onClick={props.action}>{props.labelTitle}</button>
            <div id="para"></div>
            <div
              id="email-error2"></div>
      </div>
  )
}
