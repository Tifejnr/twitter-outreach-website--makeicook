
export default function AddBtn(props) {
  return (
     <section className='addMemberBtn'>
        <button className="execution-btn" id="deleting-btn" onClick={props.action}>{props.labelTitle}</button>
    </section>
  )
}
