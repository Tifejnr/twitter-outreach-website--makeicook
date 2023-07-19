import React from 'react'

export default function Input(props) {
  return (
        <section class="memberDetailsCont">
          <label htmlFor='memberDetailTextArea'><p>{props.inputLabel}</p></label>
          <textarea
            name=""
            id="memberDetailTextArea"
            cols="40"
            rows="10"
            placeholder={props.inputPlaceholderText}></textarea>
          <p class="error">error</p>
        </section>

  )
}


