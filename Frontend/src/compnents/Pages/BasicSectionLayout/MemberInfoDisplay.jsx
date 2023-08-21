

export default function MemberInfoDisplay(props) {
    const memberDetailObj = props.memberDetailObj ;
  return (
    <form  className="eachMemberListCont">
        <section className='member-info-container'>
          <input
            //   onClick={checkboxRatioNotifier}
              type="checkbox"
              name="select-member"
              title="Check to select member"
            //   ref={checkboxRef}
              className="inputs board-checkbox"
              id={`checkMembers${props.indexNo}`}
            />
         <article >
          <p className={`fullname${props.indexNo}`}> {memberDetailObj.fullName}</p>
          <p className={`username${props.indexNo}`}>@{memberDetailObj.username}</p>
            {/* <ul>
                <li>Workspace</li>
        
            </ul> */}
         </article>
        </section>
    </form>
  )
}
