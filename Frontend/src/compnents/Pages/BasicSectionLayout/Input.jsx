import React from 'react'

export default function Input(props) {
  return (
        <section className="memberDetailsCont">
          <label htmlFor='memberDetailTextArea'><p>{props.inputLabel}</p></label>
          <textarea
            name=""
            id="memberDetailTextArea"
            cols="40"
            rows="10"
            placeholder={props.inputPlaceholderText}></textarea>
          <p className="error">error</p>
        </section>

  )
}


