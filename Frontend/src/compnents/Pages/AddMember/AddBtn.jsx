import IsBoxChecked from "../../../JS functions/isBoxChecked"

export default function AddBtn() {
  return (
     <div className='addMemberBtn'>
            <button id="deleting-btn" onClick={IsBoxChecked}>Add Member</button>
            <div id="para"></div>
            <div
              id="email-error2"></div>
      </div>
  )
}
